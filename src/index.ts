import dotenv from "dotenv"
dotenv.config()
import { AppDataSource } from "./data-source";
import express from "express";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import profileRoute from "./routes/profile";


const app = express();

AppDataSource.initialize().then(async () => {


    app.use(express.json());
    app.use("/user", userRoute);
    app.use("/auth", authRoute);
    app.use("/profile", profileRoute);

    app.listen(8000, () => console.log(`listening on port 8000`));

}).catch(error => console.log(error))

