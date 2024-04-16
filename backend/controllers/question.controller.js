
import Question from '../models/question.model.js'; // Import your Question model
import { csvRead } from '../helper/fileReadHelper.js';
import csv from 'csv-parser';
import xlsx from 'xlsx';
import { Readable } from 'stream'; 

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