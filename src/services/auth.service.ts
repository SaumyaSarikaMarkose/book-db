// src/services/auth.service.ts
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  
  // Secret key for JWT (store in .env for production)
  private jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      return null; // User not found
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; // Invalid password
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, this.jwtSecret, { expiresIn: '1h' });

    return token;
  }

  // Utility function for hashing passwords
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
