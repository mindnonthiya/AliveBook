import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120 })
    bookname: string;

    @Column({ length: 20 })
    ISBN: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    // ✅ เพิ่มช่องเก็บลิงก์รูปภาพ
    @Column({ length: 255, nullable: true })
    image_url: string;
}
