import mongoose from "mongoose";

const submitSchema = new mongoose.Schema(
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
		
		answered: {
			type: Number,
		},
        totalCorrect: {
			type: Number,
		},
        totalwrong: {
			type: Number,
		},
        correctMarks: {
			type: Number,
		},
        negativeMarks: {
			type: Number,
		},
        marksObtain: {
			type: Number,
		},

		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true}
);

const SubmitExam = mongoose.model("SubmitExam", submitSchema);

export default SubmitExam;