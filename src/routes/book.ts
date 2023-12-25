import express from "express";
import { getBooks, getBook, createBook, deleteBook, updateBook } from "../controllers/book_controller"
import { isAuth } from "../middleware/isAuth";
import { checkUserRole } from "../middleware/checkUserRole";
import { isLibrarian } from "../middleware/isLibrarian";
import { getBorrowedBooks } from "../controllers/book_controller";

const router = express.Router();

// get all book
router.get("/books", getBooks);

// get one book
router.get("/:bookId", getBook);

// create book
router.post("/create_book", createBook);

// update book
router.put("/:bookId", updateBook);

// deletebook
router.delete("/:bookId", deleteBook);

// get all borrow
router.get("/borrowed_books", getBorrowedBooks);

// search book




export default router;


