import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { DeactiveExam, addExam, deleteExam, editExam, getCountdownEndTime, getExamAll, getExamById, saveCountdownEndTime, } from "../controllers/exam.controller.js";

const router = express.Router();

router.post("/addexam", protectRoute, addExam);
router.post("/getexam",protectRoute, getExamById);
router.post("/getexamall",protectRoute, getExamAll);
router.post("/editexam", protectRoute, editExam);
router.post("/deleteexam", protectRoute, deleteExam);
router.post("/deactiveexam", protectRoute, DeactiveExam);
router.post("/save-countdown-end-time", protectRoute, saveCountdownEndTime);
router.post("/get-countdown-end-time", protectRoute,getCountdownEndTime);

export default router;
