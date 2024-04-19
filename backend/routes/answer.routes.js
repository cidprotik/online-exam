import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addAnswer, clearAnswer } from "../controllers/answer.controller.js";

const router = express.Router();

router.post("/addanswer", protectRoute, addAnswer);
router.post("/clearanswer", protectRoute, clearAnswer);

export default router;
