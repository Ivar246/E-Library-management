import { Request, Express } from "express"

declare global {
    namespace Express {
        interface Request {
            user: string
        }
    }
}