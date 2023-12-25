import express from "express";
import { createGenre, updateRole } from "../controllers/admin_controller"
const router = express.Router();

// create genre
router.post("/create_genre", createGenre);

// update user role
router.put("/update_role/:userId", updateRole);

// get all activity



// get activity of one user 



export default router;