// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response): Promise<Response> {
    console.log("nnnnnnnnnnnnnnnnnn")
    console.log('Request body:', req.body); // Log the request body for debugging

    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const token = await this.authService.login(email, password);

      if (!token) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      return res.json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
