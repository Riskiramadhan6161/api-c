import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity.js';

@Entity({ name: 'shipments' })
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  order_id: string;

  @OneToOne(() => Order, (order) => order.shipment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Relation<Order>;

  @Column({ type: 'varchar', length: 100, nullable: true })
  courier: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tracking_number: string | null;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  shipped_at: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  delivered_at: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}