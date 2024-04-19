import Answer from "../models/answer.model.js";

export const addAnswer = async (req, res) => {
	try {
		const { userId, examId, questionId, answer,editMode } = req.body;

		const isAnswered = await Answer.findOne({  userId, examId, questionId  });

		if (isAnswered) {
            const existingAnswer = await Answer.findOneAndUpdate(
                { userId, examId, questionId },
                { answer },
                { new: true }
            );

            if (existingAnswer) {
                return res.status(200).json({
                    _id: existingAnswer._id,
                    userId: existingAnswer.userId,
                    answer: existingAnswer.answer,
                });
            } else {
                return res.status(404).json({ error: "Answer not found for editing" });
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

export const clearAnswer = async (req, res) => {
	try {
		const { userId, examId, questionId } = req.body;

		const isAnswered = await Answer.findOne({  userId, examId, questionId  });

		if(isAnswered){
			await Answer.deleteOne({ userId, examId, questionId });
            return res.status(200).json({ message: "Answer deleted successfully" });
        } else {
            return res.status(404).json({ error: "Answer not found" });
        }
		
	} catch (error) {
		console.log("Error in exam controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
