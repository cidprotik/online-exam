import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addAnswer } from "../controllers/answer.controller.js";

const router = express.Router();

router.post("/addanswer", protectRoute, addAnswer);

export default router;
