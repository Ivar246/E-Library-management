import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userId = JSON.parse(req.user).userId;
    const user = await AppDataSource.manager.findOneBy(User, { id: userId });
    if (user?.role === 'admin') {
        return next();
    }
    return res.status(401).json({ message: "couldn't go further." });
}