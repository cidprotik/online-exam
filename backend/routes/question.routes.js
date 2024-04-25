import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addQuestion, addQuestionBulk, deleteQuestion, deleteQuestionAll, editQuestion, getQuestionAll } from "../controllers/question.controller.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/addquestions", protectRoute, addQuestion);
router.post("/editquestions", protectRoute, editQuestion);
router.post("/getallquestion", protectRoute, getQuestionAll);
router.post("/addexcel",upload.single('file'), protectRoute, addQuestionBulk);
router.post("/deletequestions", protectRoute, deleteQuestion);
router.post("/deletequestionsall", protectRoute, deleteQuestionAll);

export default router;
