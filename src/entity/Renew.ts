import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Borrow } from "./Borrow";

@Entity()
export class Renew {
    @PrimaryGeneratedColumn()
    id: number

    @Column("int", {
        name: 'renewal_count',
        nullable: true
    })
    renewal_count: number

    @OneToOne(() => Borrow)
    borrow: Borrow

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    update_at: Date
}