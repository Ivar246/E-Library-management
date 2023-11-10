import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, CreateDateColumn } from "typeorm"

import { Borrow } from "./Borrow"
import { Rating } from "./Rating"
import { Review } from "./Review"
import { Profile } from "./Profile"
import { Role } from "../db/config"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 20
    })
    username: string

    @Column("int")
    age: number

    @Column("bigint")
    phone: number

    @Column({
        type: "varchar",
        length: 50,
        unique: true
    })
    email: string

    @Column({
        type: "varchar"
    })
    password: string


    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @OneToMany(() => Borrow, borrow => borrow.users)
    borrows: Borrow[]

    @OneToMany(() => Rating, rating => rating.user, {
        onDelete: 'CASCADE',
    })
    ratings: Rating[];

    @OneToMany(() => Review, review => review.user, { onDelete: "CASCADE" })
    reviews: Review[];

    @OneToOne(() => Profile, { nullable: true, cascade: true })
    @JoinColumn({ name: "profile_id" })
    profile: Profile

    @CreateDateColumn()
    created_at: Date
}
