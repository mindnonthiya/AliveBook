import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';  // เพิ่มบรรทัดนี้
import { TypeOrmModule } from '@nestjs/typeorm'; // เพิ่มบรรทัดนี ้อีก 1 บรรทัด 
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    // เพิ่มบรรทัดนี ้เพื่อโหลด .env 
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),


    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? '12345678', // เปลี่ยนเป็นของ นศ 
      database: process.env.DB_NAME ?? 'bookstore',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],  // หรือระบุตรงๆ: [book] 
synchronize: false, 
}),
BooksModule,   // เพิ่ม BooksModule ที ่นี่        
],
 
controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }