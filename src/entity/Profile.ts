import { Entity, PrimaryGeneratedColumn, Column, IntegerType, OneToMany, OneToOne, JoinColumn } from "typeorm"

import { User } from "./User"
enum Role {
    USER = 'user',
    ADMIN = 'admin',
    librarian = 'librarian',
}
@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 20,
    })
    firstName: string

    @Column({
        type: "varchar",
        length: 20,
    })
    lastName: string

    @Column("varchar", {
        nullable: true,
        unique: true
    })
    profile_image: string

    @OneToOne(() => User, user => user.profile)
    user: User



}
