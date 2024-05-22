import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
	{
		examId: {
            type: mongoose.Schema.ObjectId,
            ref: "Exam",
            required: true
        },
		section: {
			type: String,
			default: "section1",
		},
		q_title: {
			type: String,
			required: true,
		},
		option1: {
			type: String,
			required: true,
			
		},
		option2: {
			type: String,
			required: true,
			
		},
		option3: {
			type: String,
            required: true,
		},

        option4: {
			type: String,
            required: true,
		},
        answer: {
			type: String,
            enum: ["option1", "option2","option3","option4"]
		},

		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;