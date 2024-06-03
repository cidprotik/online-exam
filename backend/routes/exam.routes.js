import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { DeactiveExam, addExam, deleteExam, editExam, getCountdownEndTime, getExamAll, getExamById, getResultsAll, saveCountdownEndTime,submitExam, } from "../controllers/exam.controller.js";

const router = express.Router();

router.post("/addexam", protectRoute, addExam);
router.post("/getexam",protectRoute, getExamById);
router.post("/getexamall",protectRoute, getExamAll);
router.post("/editexam", protectRoute, editExam);
router.post("/deleteexam", protectRoute, deleteExam);
router.post("/deactiveexam", protectRoute, DeactiveExam);
router.post("/save-countdown-end-time", protectRoute, saveCountdownEndTime);
router.post("/get-countdown-end-time", protectRoute,getCountdownEndTime);
router.post("/submit-exam", protectRoute,submitExam);
router.post("/resultsall", protectRoute,getResultsAll);

export default router;
