import internal from "stream";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Borrow } from "./Borrow";
import { Rating } from "./Rating";
import { Review } from "./Review";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    title: string

    @Column()
    author: string

    @Column()
    genre: string

    @Column({ type: "int" })
    quantity: number

    @OneToMany(() => Borrow, borrow => borrow.books)
    borrows: Borrow[]

    @OneToMany(() => Rating, rating => rating.book)
    ratings: Rating[]

    @OneToMany(() => Review, review => review.book)
    reviews: Review[]

}