import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { DeactiveExam, addExam, deleteExam, editExam, getExamAll, getExamById } from "../controllers/exam.controller.js";

const router = express.Router();

router.post("/addexam", protectRoute, addExam);
router.post("/getexam", getExamById);
router.post("/getexamall", getExamAll);
router.post("/editexam", protectRoute, editExam);
router.post("/deleteexam", protectRoute, deleteExam);
router.post("/deactiveexam", protectRoute, DeactiveExam);

export default router;
