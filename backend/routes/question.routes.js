import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addQuestion } from "../controllers/question.controller.js";

const router = express.Router();

router.post("/addquestions", protectRoute, addQuestion);

export default router;
