import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addQuestion, addQuestionBulk } from "../controllers/question.controller.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/addquestions", protectRoute, addQuestion);
router.post("/addexcel",upload.single('file'), protectRoute, addQuestionBulk);

export default router;
