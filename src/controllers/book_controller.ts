import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { Renew } from "../entity/Renew";
import { Genre } from "../entity/Genre";
import { User } from "../entity/User";
import { Borrow } from "../entity/Borrow";
import { Status } from "../db/config";

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const books = await AppDataSource.manager.find(Book);
        return res.json({ books: books })
    } catch (error) {
        return res.status(400).json({ message: "couldn't get books", error })
    }
}

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.bookId);

    try {
        const book = await AppDataSource.manager.findOneBy(Book, { id: bookId });
        return res.status(200).json({ status: "success", book: book });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", message: "couldn't get book", error });
    }
}

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, genreId, quantity } = req.body;

    try {
        const book = new Book();
        const genre = await AppDataSource.manager.findOneBy(Genre, { id: genreId }) as Genre;

        book.title = title;
        book.author = author;
        book.genres = [genre];
        book.total_quantity = quantity;
        book.available_quantity = quantity;

        await AppDataSource.manager.save(book);
        return res.status(201).json({ message: "book created successfully." });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "book couldn't created." });
    }

}

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.bookId);
    const { title, author, genreId, quantity } = req.body;

    try {
        const book = await AppDataSource.manager.getRepository(Book).findOneBy({ id: bookId });
        if (book) {
            book.title = title;
            book.author = author;

            book.genres = [...book.genres, await AppDataSource.getRepository(Genre).findOneBy({ id: genreId }) as Genre];

            book.total_quantity = quantity;
        }
        await AppDataSource.manager.save(book);
        return res.status(201).json({ message: "book created successfully." });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "book couldn't created." });
    }

}

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.bookId);

    try {
        await AppDataSource.getRepository(Book).delete(bookId);
        return res.status(200).json({ status: "success", message: "book deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: "book couldn't be deleted" });
    }
}

export const getBorrowedBooks = async (req: Request, res: Response, next: NextFunction) => {
    const books = await AppDataSource.manager.find(Borrow, { where: { status: Status.BORROWED } });
    console.log("book: ", books);

}