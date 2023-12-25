import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Profile } from "../entity/Profile";
import bcrypt from "bcrypt";
import { Role } from "../db/config";

//get users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await AppDataSource.manager.find(User);

    return res.status(200).json({ status: "success", users: users });
}

// get user
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId);
    const user = await AppDataSource.manager.findOneBy(User, { id: userId });

    const userCopy = { ...user };
    delete userCopy.password;

    return res.status(200).json({ status: "success", user: userCopy });
}

// create_user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, age, phone, password, role } = req.body;

    try {
        if (await AppDataSource.manager.findOneBy(User, { email })) {
            return res.status(409).json({ status: "failure", message: "user with the email already exist" })
        }
        if (await AppDataSource.manager.findOneBy(User, { username })) {
            return res.status(409).json({ status: "failure", message: "username already taken" });
        }

        const user = new User();
        user.username = username;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.age = age;
        user.phone = phone;

        if (role === Role.ADMIN)
            user.role = Role.ADMIN;
        if (role === Role.LIBRARIAN)
            user.role = Role.LIBRARIAN;
        if (role === Role.USER)
            user.role = Role.USER;

        const profile = new Profile();
        user.profile = profile;

        await AppDataSource.manager.save(user)
        return res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", message: "user couldn't be created" })
    }
}

// update User
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId);
    const { username, email, phone, age } = req.body;

    try {
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } }) as User;
        console.log(user)
        if (!user) return res.status(404).json({ status: "failed", message: "user not found" });

        user.username = username;
        user.email = email;
        user.age = age;
        user.phone = phone;

        console.log(user)

        await AppDataSource.manager.save(user);
        return res.json({ status: "success", message: "User updated successfully.", user: updateUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "failed", message: "User couldn't be updated.", error: error })
    }
}

// delete User 
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId);
    try {
        await AppDataSource.manager.delete(User, userId)
        return res.status(200).json({ status: "success", message: "user deleted successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "couldn't delete user.", status: "failed" })
    }
}