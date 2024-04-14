import Question from "../models/question.model.js";

export const addQuestion = async (req, res) => {
	try {
		const { examname, q_title, option1, option2, option3, option4, answer } = req.body;

        const requiredFields = [
            { field: examname, message: "Please Select exam name" },
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
			examname, q_title, option1, option2, option3, option4, answer
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