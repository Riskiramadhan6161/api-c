import { boolean } from "joi";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('mahasiswa')
export class mahasiswa {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 64 })
    name: string;

    @Column({ type: 'varchar', length: 64 })
    author: string;

    @Column({ type: 'varchar' })
    isbn: string;

    @Column({ type: 'int' })
    publishedYear: number;

    @Column({ type: 'boolean', default: true })
    isAvailable: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updateAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date;
    
} // <--- Kurung kurawal penutup kelas mahasiswa berada di paling bawah setelah semua kolom