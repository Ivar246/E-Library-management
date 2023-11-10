import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text", {
        name: 'review'
    })
    review: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(() => Book, book => book.ratings)
    @JoinColumn({ name: "book_id" })
    book: Book
}