import express from "express";
import { getUsers, getUser } from "../controllers/user_controller"

const router = express.Router();




// get all user
router.get("/api/users", getUsers)

// get one user
router.get("/api/:userId", getUser)

// create user
// router.post("api/create_user", createUser)

// update user
//router.put("api/update_user/:userId", updateUser)


// delete user
//router.delete("/api/:userId", deleteUser)



export default router;