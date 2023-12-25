import express from "express";
import { postBorrow } from "../controllers/borrow_controller"
import { isAuth } from "../middleware/isAuth";
const router = express.Router();

router.post("/:bookId", isAuth, postBorrow);



export default router;