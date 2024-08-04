// src/controllers/book.controller.ts
import { Request, Response } from 'express';
import { BookService } from '../services/book.service';

export class BookController {
  private bookService = new BookService();

  async createBook(req: Request, res: Response): Promise<Response> {
    const { name, description, price, author, bookImage } = req.body;

    if (!name || !description || !price || !author || !bookImage) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const book = await this.bookService.createBook(name, description, price, author, bookImage);
      return res.status(201).json(book);
    } catch (error) {
      console.error('Error creating book:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  async getAllBooks(req: Request, res: Response): Promise<Response> {
    try {
      const books = await this.bookService.getAllBooks();
      return res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateBook(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !updateData) {
      return res.status(400).json({ message: 'ID and update data are required' });
    }

    try {
      const updatedBook = await this.bookService.updateBook(id, updateData);

      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }

      return res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

}
