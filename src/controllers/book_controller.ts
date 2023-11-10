import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

const getbooks = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const books = await AppDataSource.manager.createQueryBuilder().select().from(Book, "book");
        return res.json({ books: books })
    } catch (error) {
        return res.status(400).json({ message: "couldn't get books" })
    }

}

const getBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.bookId);

    try {
        const book = await AppDataSource.manager.findOneBy(Book, { id: bookId });
        return res.status(200).json({ status: "success", book: book });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", message: "couldn't get book" });
    }

}

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, genre, quantity } = req.body;

    try {
        const book = new Book();

        book.title = title;
        book.author = author;
        book.genre = genre;
        book.quantity = quantity;

        await AppDataSource.manager.save(book);
        return res.status(201).json({ message: "book created successfully." });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "book couldn't created." });
    }


}