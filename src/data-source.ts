import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Book } from "./entity/Book"
import { Borrow } from "./entity/Borrow"
import { Profile } from "./entity/Profile"
import { Rating } from "./entity/Rating"
import { Review } from "./entity/Review"
import { Renew } from "./entity/Renew"
import { Genre } from "./entity/Genre"

console.log(process.env.DB_USER)
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "Library Management System",
    synchronize: true,
    logging: false,
    entities: [User, Profile, Book, Borrow, Renew, Rating, Review, Genre],
})
