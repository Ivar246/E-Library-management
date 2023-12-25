import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Borrow } from "./Borrow";
import { Rating } from "./Rating";
import { Review } from "./Review";
import { Genre } from "./Genre";
@Entity("books")
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    title: string

    @Column()
    author: string

    @Column({ type: "int", default: 0 })
    total_quantity: number

    @Column({ type: "int", default: 0 })
    available_quantity: number

    @ManyToMany(() => Genre, genre => genre.books)
    @JoinTable({ name: "book_genre" })
    genres: Genre[]

    @OneToMany(() => Borrow, borrow => borrow.book)
    borrows: Borrow[]

    @OneToMany(() => Rating, rating => rating.book)
    ratings: Rating[]

    @OneToMany(() => Review, review => review.book)
    reviews: Review[]

}