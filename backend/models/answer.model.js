import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
	{
		userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
		examId: {
			type: mongoose.Schema.ObjectId,
            ref: "Exam",
			required: true,
		},
		questionId: {
            type: mongoose.Schema.ObjectId,
			ref: "Question",
			required: true,
			
		},
		answer: {
			type: String,
			enum: ["option1", "option2","option3","option4"],
			
		},

		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true}
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;