import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { User } from "../entity/User";
import { Borrow } from "../entity/Borrow";
import { Status } from "../db/config";


export const postBorrow = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.bookId);
    const userId = JSON.parse(req.user).userId;
    const { numberOfDays } = req.body;

    try {
        const book = await AppDataSource.getRepository(Book).findOneBy({ id: bookId }) as Book;
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });



        // check borrow limit for user

        const borrow = new Borrow()

        if (user && book) {
            if (book.available_quantity <= 0) return res.status(404).json({ message: "Book is not currently available." });

            borrow.user = user;
            borrow.book = book;

            book.available_quantity = book.available_quantity - 1;
        }

        const currentDate = new Date();
        const dueDate = new Date(currentDate.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
        borrow.due_date = dueDate;
        borrow.status = Status.BORROWED;

        await AppDataSource.getRepository(Borrow).save(borrow);
        await AppDataSource.getRepository(Book).save(book);

        return res.status(200).json({ status: "success", message: "borrowed successfully." })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ status: "failed", message: "couldn't proceed further." });
    }
}

const getBorrowHistory = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId);
    try {
        const borrowHistory = await AppDataSource.getRepository(Borrow).find({
            relations: {
                user: true,
                book: true,

            }, where: {
                user: {
                    id: userId
                }
            }
        })

        return res.status(200).json(borrowHistory)
    } catch (error) {
        return res.status(500).json(error)
    }
}


export const renew = async (req: Request, res: Response, next: NextFunction) => {
    // update dew date

    // renew 
}




