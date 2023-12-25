import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, OneToOne } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";
import { Renew } from "./Renew";

import { Status } from "../db/config"


@Entity()
export class Borrow {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Book, book => book.borrows)
    @JoinColumn({ name: "book_id" })
    book: Book

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @CreateDateColumn({ name: "borrow_date" })
    borrow_date: Date

    @Column({
        type: 'date',
        nullable: true,
        default: null

    })
    return_date: Date

    @Column()
    due_date: Date

    @Column({
        type: "enum",
        enum: Status
    })
    status: Status

    @Column({
        type: "float",
        default: null
    })
    fine_amount: number

    @OneToOne(() => Renew, renew => renew.borrow)
    @JoinColumn({ name: "renew_id" })
    renew: Renew

}