import Exam from "../models/exam.model.js";
import ExamSession from "../models/examSession.js"

export const addExam = async (req, res) => {
	try {
		const { examName, date_time, duration, totalquestion, sectionData } = req.body;

        const requiredFields = [
            { field: examName, message: "Please Enter exam name" },
            { field: date_time, message: "Please Enter exam date and time" },
            { field: duration, message: "Please Enter exam duration" },
            { field: totalquestion, message: "Please Enter total question" },
            { field: sectionData, message: "Please Enter Atleast One Section" },
        ];

        for (const fieldData of requiredFields) {
            if (!fieldData.field) {
                return res.status(400).json({ error: fieldData.message });
            }
        }

		const newExam = new Exam({
			examname:examName,date_time, duration, totalquestion, sectionData
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
		res.status(500).json({ error: "May have Validation or Internal Server Error" });
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
        const {examId, examName, date_time, duration, totalquestion, sectionData } = req.body;

        // Check if the question exists
        const existingExam = await Exam.findById({_id: examId});

        if (!existingExam) {
            return res.status(404).json({ error: "Exam not found" });
        }

        // Update the question fields
        existingExam.examname = examName;
        existingExam.duration = duration;
        existingExam.date_time = date_time;
        existingExam.totalquestion = totalquestion;
        existingExam.sectionData = sectionData;
        // Save the updated question
        await existingExam.save();

        return res.status(200).json({
            _id: existingExam._id,
            examname: existingExam.examname,
            duration: existingExam.duration,
            totalquestion: existingExam.totalquestion,
            sectionData: existingExam.sectionData,
            date_time: existingExam.date_time,
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

export const saveCountdownEndTime = async (req, res) => {
    const { userId, examId, storedEndTime,remainingTime } = req.body;
    console.log(userId, examId, storedEndTime,remainingTime);
    try {
        await ExamSession.updateOne(
            { userId, examId },
            { storedEndTime,remainingTime },
            { upsert: true }
          );
          res.status(200).send({ message: 'Countdown end time saved successfully' });
        } catch (error) {
          res.status(500).send({ message: 'Error saving countdown end time', error });
        }
  };

  export const getCountdownEndTime = async (req, res) => {
    const { userId, examId } = req.body;
    
    try {
        const examSession = await ExamSession.findOne({ userId, examId });
    
        if (examSession) {
          res.status(200).json({ success: true, storedEndTime:examSession.storedEndTime,remainingTime:examSession.remainingTime });
        } else {
          res.status(404).json({ success: false, message: 'No countdown end time found' });
        }
      } catch (error) {
        console.error('Error fetching countdown end time:', error);
        res.status(500).json({ success: false, message: 'Error fetching countdown end time', error });
      }
  };