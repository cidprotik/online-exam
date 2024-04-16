import Answer from "../models/answer.model.js";

export const addAnswer = async (req, res) => {
	try {
		const { userId, examId, questionId, answer } = req.body;

        const requiredFields = [
            { field: userId, message: "Please Select exam name" },
            { field: examId, message: "Please Enter Question Title" },
            { field: questionId, message: "Please Enter option 1" },
            { field: answer, message: "Please Enter option 2" },
        ];

        for (const fieldData of requiredFields) {
            if (!fieldData.field) {
                return res.status(400).json({ error: fieldData.message });
            }
        }

		const newAnswer = new Answer({
			userId, examId, questionId, answer
		});

		if (newAnswer) {
            console.log(newAnswer)
			await newAnswer.save();

			res.status(201).json({
				_id: newAnswer._id,
				userId: newAnswer.userId,
				answer: newAnswer.answer,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in exam controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};