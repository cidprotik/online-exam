import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
	{
		userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
			required: true,
		},
		examId: {
			type: mongoose.Schema.ObjectId,
            ref: "Exam",
			required: true,
		},
		answeredQuestions: {
			type: [Number], // Array of question indexes that are answered
			default: [],
		  },
		  unansweredQuestions: {
			type: [Number], // Array of question indexes that are unanswered
			default: [],
		  },
		  selectedOptions: {
			type: Map,
 			of: String, // Assuming options are strings (like 'A', 'B', 'C', 'D')
            default: {}, 
		  },
		  markedForReview: {
			type: [Number], // Array of question indexes that are unanswered
			default: [],
		  },
		  selectedSection: {
			type: String, // Array of question indexes that are unanswered
		  },
	},
	{ timestamps: true }
);

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

export default UserProgress;
