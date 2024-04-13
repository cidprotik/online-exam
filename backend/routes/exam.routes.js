import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addExam } from "../controllers/exam.controller.js";

const router = express.Router();

router.post("/addexam", protectRoute, addExam);

export default router;
