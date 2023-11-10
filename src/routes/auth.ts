import express from "express"
import { register, login } from "../controllers/auth_controller";
const router = express.Router()



// get register

//post register
router.post("/api/register", register)

//get login

// post login
router.post("/api/login", login)

// reset

// logout

export default router;