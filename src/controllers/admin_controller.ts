import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Genre } from "../entity/Genre";
import { User } from "../entity/User";
import { Role } from "../db/config";


export const createGenre = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const genre = new Genre();
    genre.name = name;
    try {
        await AppDataSource.manager.save(genre);
        return res.status(201).json({ message: "genre created", genre: genre })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", message: "new genre couldn't be created." });
    }
}

export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
    const userId = +req.params.userId;
    const role = req.body.role;

    try {
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

        if (!user) return res.status(404).json({ status: 404, message: "user not found." });

        if (role === Role.LIBRARIAN)
            user.role = Role.LIBRARIAN;
        else
            user.role = Role.USER

        return res.status(200).json({ status: "success", message: "Role updated successfully." });

    } catch (error) {
        return res.status(500).json({ status: "failed", message: "Role couldn't be updated." });
    }

}