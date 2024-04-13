import Exam from "../models/exam.model.js";

export const addExam = async (req, res) => {
	try {
		const { examname, duration, totalquestion, rightmark, wrongmark, examtime, examdate } = req.body;

        const requiredFields = [
            { field: examname, message: "Please Enter exam name" },
            { field: duration, message: "Please Enter exam duration" },
            { field: totalquestion, message: "Please Enter total question" },
            { field: rightmark, message: "Please Enter right mark" },
            { field: wrongmark, message: "Please Enter wrong mark" },
            { field: examtime, message: "Please Enter exam time" },
            { field: examdate, message: "Please Enter exam date" }
        ];

        for (const fieldData of requiredFields) {
            if (!fieldData.field) {
                return res.status(400).json({ error: fieldData.message });
            }
        }

		const newExam = new Exam({
			examname, duration, totalquestion, rightmark, wrongmark, examtime, examdate
		});

		if (newExam) {
            console.log(newExam)
			await newExam.save();

			res.status(201).json({
				_id: newExam._id,
				examname: newExam.examname,
				duration: newExam.duration,
				totalquestion: newExam.totalquestion,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in exam controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};