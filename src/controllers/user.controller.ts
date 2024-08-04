import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController{
    private userService = new UserService();
    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        try {
          const user = await this.userService.createUser(name, email, password);
          return res.status(201).json(user);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
}