// ติดต่อ dB เพื่อทำกิจกรรม CRUD
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>
    ) { }
    // Read: Get all books 
    async findAll(): Promise<Book[]> {
        return this.booksRepository.find();
    }
    // Read: Get one book by id 
    async findOne(id: number): Promise<Book> {
        const book = await this.booksRepository.findOneBy({ id });
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    // Create: Add new book 
    async create(book: Book): Promise<Book> {
        return this.booksRepository.save(book);
    }
    // Update: Edit book by id 
    async update(id: number, book: Partial<Book>): Promise<Book> {
        const existingBook = await this.booksRepository.findOneBy({ id });
        if (!existingBook) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        await this.booksRepository.update(id, book);
        const updatedBook = await this.booksRepository.findOneBy({ id });
        if (!updatedBook) {
            throw new NotFoundException(`Book with ID ${id} not found after update`);
        }
        return updatedBook;
    }
    // Delete: Remove book by id 
    async remove(id: number): Promise<void> {
        const existingBook = await this.booksRepository.findOneBy({ id });
        if (!existingBook) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        await this.booksRepository.delete(id); // Ensure deletion is handled properly 
    }
}