// ติดต่อกับ Front-end โดยใช้ REST API + Endpoint(url)
import { Controller,Get,Post,Put,Delete,Param,Body} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books') // Base URL: /books 

export class BooksController {
    constructor(private readonly booksService: BooksService) { }
    @Get() // GET /books - Get all 
    findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id') // GET /books/:id - Get one 
    findOne(@Param('id') id: string): Promise<Book> {
        return this.booksService.findOne(parseInt(id));
    }
    @Post() // POST /books - Create 
    create(@Body() book: Book): Promise<Book> {
        return this.booksService.create(book);
    }
    @Put(':id') // PUT /books/:id - Update 
    update(@Param('id') id: string, @Body() book: Book): Promise<Book> {
        return this.booksService.update(parseInt(id), book);
    }
    @Delete(':id') // DELETE /books/:id - Delete 
    remove(@Param('id') id: string): Promise<void> {
        return this.booksService.remove(parseInt(id));
    }
}