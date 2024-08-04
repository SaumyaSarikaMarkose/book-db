import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds for bcrypt hashing

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(name: string, email: string, password: string): Promise<User> {
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user instance
    const user = this.userRepository.create({ name, email, password: hashedPassword });

    // Save the user to the database
    return await this.userRepository.save(user);
  }
}
