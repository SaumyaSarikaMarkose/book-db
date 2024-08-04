// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Ensure to set your JWT secret in an environment variable
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

// Extend the Express Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Use a specific type if you have one for the user
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // Extract token from Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.sendStatus(403); // Forbidden if no token is provided
  }

  // Verify the token using the JWT secret
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid or expired
    }

    // Add the user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};
