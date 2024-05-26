import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
	sectionName: String,
	noQuestion: Number,
	maxAnswer: Number,
	rightMark: Number,
	wrongMark: Number,
  });

const examSchema = new mongoose.Schema(
	{
		examname: {
			type: String,
			required: true,
		},
		date_time: { 
			type: Date, 
			required: true 
		},
		duration: {
			type: Number,
			required: true,
		},
		totalquestion: {
			type: Number,
			required: true,
			
		},
		sectionData: [sectionSchema],
		status: {
			type: String,
            default: "active",
			enum: ["active", "deactive"]
		},

		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;