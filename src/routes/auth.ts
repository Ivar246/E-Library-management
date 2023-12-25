import express from "express"
import { register, login } from "../controllers/auth_controller";
const router = express.Router()


//post register
router.post("/register", register)

// post login
router.post("/login", login)

// reset

// logout

export default router;