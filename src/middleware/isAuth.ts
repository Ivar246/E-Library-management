import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ExtendedRequest } from "../../types/customTypes";


export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "invalid token" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "token couldn't be verified" })
        }
        req.user = JSON.stringify(user);
        return next()
    })
    return;
}
