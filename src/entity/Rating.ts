import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number

    @Column("int", {
        name: 'rating',
        nullable: true
    })
    rating: number

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(() => Book, book => book.ratings)
    @JoinColumn({ name: "book_id" })
    book: Book
}