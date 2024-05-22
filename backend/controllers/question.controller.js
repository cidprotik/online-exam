
import Question from '../models/question.model.js'; // Import your Question model
import { csvRead } from '../helper/fileReadHelper.js';
import csv from 'csv-parser';
import xlsx from 'xlsx';
import { Readable } from 'stream'; 
import Exam from '../models/exam.model.js';

export const addQuestion = async (req, res) => {
	try {
		const { examId, q_title, option1, option2, option3, option4, answer } = req.body;

        const requiredFields = [
            { field: examId, message: "Please Select exam name" },
            { field: q_title, message: "Please Enter Question Title" },
            { field: option1, message: "Please Enter option 1" },
            { field: option2, message: "Please Enter option 2" },
            { field: option3, message: "Please Enter option 3" },
            { field: option4, message: "Please Enter option 4" },
            { field: answer, message: "Please Select Currect Answer Option" }
        ];

        for (const fieldData of requiredFields) {
            if (!fieldData.field) {
                return res.status(400).json({ error: fieldData.message });
            }
        }

		const newQuestion = new Question({
			examId, q_title, option1, option2, option3, option4, answer
		});

		if (newQuestion) {
            console.log(newQuestion)
			await newQuestion.save();

			res.status(201).json({
				_id: newQuestion._id,
				examname: newQuestion.examname,
				q_title: newQuestion.q_title,
				answer: newQuestion.answer,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in exam controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const editQuestion = async (req, res) => {
    try {
        const { questionId, examId, q_title, option1, option2, option3, option4, answer } = req.body;

        // Check if the question exists
        const existingQuestion = await Question.findById({_id: questionId});

        if (!existingQuestion) {
            return res.status(404).json({ error: "Question not found" });
        }

        // Update the question fields
        existingQuestion.examId = examId;
        existingQuestion.q_title = q_title;
        existingQuestion.option1 = option1;
        existingQuestion.option2 = option2;
        existingQuestion.option3 = option3;
        existingQuestion.option4 = option4;
        existingQuestion.answer = answer;

        // Save the updated question
        await existingQuestion.save();

        return res.status(200).json({
            _id: existingQuestion._id,
            examId: existingQuestion.examId,
            q_title: existingQuestion.q_title,
            option1: existingQuestion.option1,
            option2: existingQuestion.option2,
            option3: existingQuestion.option3,
            option4: existingQuestion.option4,
            answer: existingQuestion.answer,
        });
    } catch (error) {
        console.log("Error in exam controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getQuestionAll = async (req, res) => {
    try {
        const {examId} = req.body;

        const existingExams = await Question.find({ examId });

        if (existingExams && existingExams.length > 0) {
            return res.status(200).json({ result: existingExams });
        } else {
            return res.status(404).json({ error: "No Questions found" });
        }

    } catch (error) {
        console.error("Error in Question controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const { questionId} = req.body;

        // Check if the question exists
        const existingQuestion = await Question.findById({_id: questionId});

        if (existingQuestion) {
            await Question.deleteOne({_id: questionId});
            return res.status(200).json({ message: "Question deleted successfully" });
        } else {
            return res.status(404).json({ error: "Question not found" });
        }

    } catch (error) {
        console.log("Error in exam controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteQuestionAll = async (req, res) => {
    try {
        const { examId} = req.body;
        const exam = await Exam.findById(examId);
        // const questions = await Question.find({ examId }).populate('examId');
        // console.log(questions);

        const result = await Question.deleteMany({ examId });

        return res.status(200).json({
            message: `Deleted ${result.deletedCount} questions for the exam ${exam.examname}`,
        });

    } catch (error) {
        console.log("Error in exam controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const addQuestionBulk = async (req, res) => {
    try {
        if (!req.file || !req.file.originalname.match(/\.(xlsx|xls|csv)$/)) {
            return res.status(400).json({ error: 'Please upload a valid Excel or CSV file' });
        }

        let questions = [];

        if (req.file.originalname.endsWith('.xlsx') || req.file.originalname.endsWith('.xls')) {
            const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            questions = xlsx.utils.sheet_to_json(worksheet);
        } else if (req.file.originalname.endsWith('.csv')) {
            const csvData = await new Promise((resolve, reject) => {
                const data = [];
                const bufferStream = new Readable();
                bufferStream.push(req.file.buffer);
                bufferStream.push(null);
                bufferStream
                    .pipe(csv())
                    .on('data', (row) => {
                        data.push(row);
                    })
                    .on('end', () => {
                        resolve(data);
                    })
                    .on('error', (error) => {
                        reject(error);
                    });
            });
            questions = csvData;
        }

        const savedQuestions = [];
        const failedQuestions = [];

        const requiredFields = [
            { key: 'examId', message: "exam name field is not available in excel" },
            { key: 'q_title', message: "Question Title field is not available in excel" },
            { key: 'option1', message: "option 1 field is not available in excel" },
            { key: 'option2', message: "option 2 field is not available in excel" },
            { key: 'option3', message: "option 3 field is not available in excel" },
            { key: 'option4', message: "option 4 field is not available in excel" },
            { key: 'answer', message: "answer field is not available in excel" }
        ];

        for (const questionData of questions) {
            const errors = {};

            for (const fieldData of requiredFields) {
                if (!questionData[fieldData.key]) {
                    errors[fieldData.key] = fieldData.message;
                }
            }

            if (Object.keys(errors).length > 0) {
                failedQuestions.push({ rowData: questionData, errors });
                continue;
            }

            const newQuestion = new Question({
                examId: questionData.examId,
                section: questionData.section,
                q_title: questionData.q_title,
                option1: questionData.option1,
                option2: questionData.option2,
                option3: questionData.option3,
                option4: questionData.option4,
                answer: questionData.answer
            });

            await newQuestion.save();
            savedQuestions.push({
                _id: newQuestion._id,
                examId: newQuestion.examId,
                q_title: newQuestion.q_title,
                answer: newQuestion.answer
            });
        }

        let message = `${savedQuestions.length} successful row(s) inserted.`;
        if (failedQuestions.length > 0) {
            message += ` ${failedQuestions.length} row(s) failed.`;
        }

        res.status(201).json({
            message,
            savedQuestions,
            failedQuestions
        });
    } catch (error) {
        console.error("Error in addQuestionBulk controller:", error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};