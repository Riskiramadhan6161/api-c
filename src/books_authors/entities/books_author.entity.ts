import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  
} from 'typeorm';
import { Book } from '../../book/entities/book-entity.js';
import { Author } from '../../authors/entities/author.entity.js';
import type { Relation } from 'typeorm';


@Entity({ name: 'books_authors' })
export class BooksAuthor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Book, (book) => book.bookAuthors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Relation<Book>;

  @Column({ type: 'uuid' })
  book_id: string;

  @ManyToOne(() => Author, (author) => author.bookAuthors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: Relation<Author>;

  @Column({ type: 'uuid' })
  author_id: string;
}