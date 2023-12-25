import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    name: string

    @ManyToMany(() => Book, book => book.genres)
    books: Book[]
}