import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Profile } from "../entity/Profile";

import { Role } from "../db/config";


export const register = async (req: Request, res: Response, next: NextFunction) => {
    // check if user already exist
    const { username, age, phone, email, password } = req.body;

    try {

        if (await AppDataSource.manager.findOneBy(User, { username: username })) {
            return res.status(409).json({ message: "username already taken." })
        }

        if (await AppDataSource.manager.findOneBy(User, { email: email })) {
            return res.status(409).json({ message: "user with the email already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User();
        user.username = username;
        user.age = age;
        user.phone = phone;
        user.email = email;
        user.password = hashedPassword;
        user.role = Role.USER
        const profile = new Profile();

        user.profile = profile;

        await AppDataSource.manager.save(user);
        return res.status(201).json({ message: "Registration sucessfull." });
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({ error: error })
    }
}

// login
export const login = async (req: Request, res: Response, next: NextFunction) => {

    const emailOrUsername = req.body.emailOrUsername;
    const password = req.body.password;

    try {

        const user = await AppDataSource.manager.createQueryBuilder(User, "user")
            .where('user.email=:emailOrUsername OR user.username=:emailOrUsername', { emailOrUsername })
            .getOne();

        if (!user) {
            return res.status(404).json({ message: "user with that email or username not found." });
        }

        const match: boolean = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "password didn't match with the email." })
        }
        const expirationTime = 5;
        const accessToken = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "5d" })

        return res.status(200).json({ message: "logged in Successfully", token: accessToken })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error })
    }
}

// reset password

//change password