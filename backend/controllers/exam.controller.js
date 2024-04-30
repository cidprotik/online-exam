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

export const getExamById = async (req, res) => {
    try {
        const {examId} = req.body;

        // Check if the question exists
        const existingExam = await Exam.findById({_id: examId});

        if (existingExam) {
            
            return res.status(200).json({ result: existingExam });
        } else {
            return res.status(404).json({ error: "Exam not found" });
        }

    } catch (error) {
        console.log("Error in exam controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getExamAll = async (req, res) => {
    try {
        const status = req.body; // Access specific property
        let existingExams; // Declare outside the if-else block
        console.log(status);
        if (status) {
            existingExams = await Exam.find(status);
            console.log("1st",existingExams) // Assign the result to the outer variable
        } else {
            existingExams = await Exam.find({}); // Assign the result to the outer variable
            console.log("2nd",existingExams)
        }

        if (existingExams && existingExams.length > 0) {
            return res.status(200).json({ result: existingExams });
        } else {
            return res.status(404).json({ error: "No active exams found" });
        }
    } catch (error) {
        console.error("Error in exam controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



export const editExam = async (req, res) => {
    try {
        const { examId, examname, duration, totalquestion, rightmark, wrongmark, examtime, examdate } = req.body;

        // Check if the question exists
        const existingExam = await Exam.findById({_id: examId});

        if (!existingExam) {
            return res.status(404).json({ error: "Exam not found" });
        }

        // Update the question fields
        existingExam.examname = examname;
        existingExam.duration = duration;
        existingExam.totalquestion = totalquestion;
        existingExam.rightmark = rightmark;
        existingExam.wrongmark = wrongmark;
        existingExam.examtime = examtime;
		existingExam.examdate = examdate;

        // Save the updated question
        await existingExam.save();

        return res.status(200).json({
            _id: existingExam._id,
            examname: existingExam.examname,
            duration: existingExam.duration,
            totalquestion: existingExam.totalquestion,
            rightmark: existingExam.rightmark,
            wrongmark: existingExam.wrongmark,
            examtime: existingExam.examtime,
            examdate: existingExam.examdate,
        });
    } catch (error) {
        console.log("Error in exam controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteExam = async (req, res) => {
    try {
        const { examId} = req.body;

        // Check if the question exists
        const existingExam = await Exam.findById({_id: examId});

        if (existingExam) {
            await Exam.deleteOne({_id: examId});
            return res.status(200).json({ message: "Exam deleted successfully" });
        } else {
            return res.status(404).json({ error: "Exam not found" });
        }

    } catch (error) {
        console.log("Error in exam controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const DeactiveExam = async (req, res) => {
    try {
        const { examId,status} = req.body;

        // Check if the question exists
        const existingExam = await Exam.findById({_id: examId});

        if (existingExam) {
            existingExam.status = status;
			await existingExam.save();

			if (existingExam.status === "active") {
				return res.status(200).json({ message: "Exam Activated successfully" });
			}
			else{
				return res.status(200).json({ message: "Exam Deactivated successfully" });
			}
            
        } else {
            return res.status(404).json({ error: "Exam not found" });
        }

    } catch (error) {
        console.log("Error in exam controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};