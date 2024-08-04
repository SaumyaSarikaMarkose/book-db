// src/routes/book.routes.ts
import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();
const bookController = new BookController();

// router.post('/books', bookController.createBook.bind(bookController));
router.post('/books', bookController.createBook.bind(bookController));
router.get('/books', bookController.getAllBooks.bind(bookController));
router.put('/books/:id', bookController.updateBook.bind(bookController));

export default router;
// authenticateJWT