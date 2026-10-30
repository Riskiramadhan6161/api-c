import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { book } from '../../book/entities/book-entity.js';
import { Author } from '../../authors/entities/author.entity.js';

@Entity('books_authors')
export class BooksAuthor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;

  @ManyToOne(() => book, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: book;

  @Column()
  authorId: number;

  @ManyToOne(() => Author, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}