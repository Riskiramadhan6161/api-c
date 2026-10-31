import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity.js';
import { Book } from '../../book/entities/book-entity.js';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  order_id: string;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Relation<Order>;

  @Column({ type: 'uuid' })
  book_id: string;

  @ManyToOne(() => Book, (book) => book.orderItems, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'book_id' })
  book: Relation<Book>;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price: number;
}