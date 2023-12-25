import express from "express";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/user_controller"

const router = express.Router();




// get all user
router.get("/users", getUsers)

// get one user
router.get("/:userId", getUser)

// create user
// router.post("/create_user", createUser)

// update user
router.put("/update_user/:userId", updateUser);

// delete user
router.delete("/delete_user/:userId", deleteUser)

// get history
//  router.get("/:userId/history", getBorrowHistory)


export default router;