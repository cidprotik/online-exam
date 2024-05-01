import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserProgress, updateUserProgress } from "../controllers/userProgress.controller.js";

const router = express.Router();

router.post("/", protectRoute, getUserProgress);
router.put("/", protectRoute, updateUserProgress);

export default router;
