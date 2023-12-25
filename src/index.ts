import dotenv from "dotenv"
dotenv.config()
import { AppDataSource } from "./data-source";
import express from "express";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import profileRoute from "./routes/profile";
import adminRoutes from "./routes/admin";
import bookRoutes from "./routes/book";
import { User } from "./entity/User";
import { Profile } from "./entity/Profile";
import { Role } from "./db/config";
import borrowRoutes from "./routes/borrow";
import bcrypt from 'bcrypt'


const app = express();

AppDataSource.initialize().then(async () => {



    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))


    // all routes
    app.use("/api/admin", adminRoutes)
    app.use("/api/user", userRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/book", bookRoutes);
    app.use("/api/profile", profileRoute);
    app.use("/api/borrow", borrowRoutes);

    app.listen(8000, () => console.log(`listening on port 8000`));

}).catch(error => console.log(error))

