import express from "express";
import { insertData, getProfile } from "../controllers/profile_controller";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

// get user-profile
router.get("/api/:userId", isAuth, getProfile)
router.post("/api/:pid", insertData);

export default router;