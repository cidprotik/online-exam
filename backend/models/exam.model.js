import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
	{
		examname: {
			type: String,
			required: true,
		},
		duration: {
			type: String,
			required: true,
		},
		totalquestion: {
			type: String,
			required: true,
			
		},
		rightmark: {
			type: String,
			required: true,
			
		},
		wrongmark: {
			type: String,
            required: true,
		},

        examtime: {
			type: String,
            required: true,
		},
        examdate: {
			type: Date,
            default: Date.now
		},

		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;