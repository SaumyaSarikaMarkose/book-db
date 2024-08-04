// src/services/book.service.ts
import { AppDataSource } from '../data-source';
import { Book } from '../entity/Book';

export class BookService {
  private bookRepository = AppDataSource.getRepository(Book);

  async createBook(name: string, description: string, price: number, author: string, bookImage: string): Promise<Book> {
    // Create a new book instance
    const book = this.bookRepository.create({ name, description, price, author, bookImage });

    // Save the book to the database
    return await this.bookRepository.save(book);
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async updateBook(id: any, updateData: Partial<Book>): Promise<Book | null> {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      return null; // Or throw an error if you prefer
    }

    this.bookRepository.merge(book, updateData);
    return await this.bookRepository.save(book);
  }
  
}
