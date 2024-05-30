import UserProgress from "../models/userProgress.model.js";

export const getUserProgress = async (req, res) => {
	try {
	  const {userId,examId,selectedSection} = req.body;
	  const userProgress = await UserProgress.findOne({ userId,examId,selectedSection });
	  if (!userProgress) {
		console.log("first attempt");
		const newUserProgress = new UserProgress({ userId, examId,selectedSection });
		await newUserProgress.save();
		return res.status(200).json(newUserProgress);
	  }
  
	  // Return the user's progress
	  return res.status(200).json(userProgress);
	} catch (error) {
	  console.error('Error fetching user progress:', error);
	  return res.status(500).json({ message: 'Error fetching user progress' });
	}
  };

export const updateUserProgress = async (req, res) => {
	try {
	  
	  const { userId,examId,answeredQuestions, unansweredQuestions,selectedOptions,markedForReview,selectedSection} = req.body;
	  // Find the user's progress and update it
	  const updatedProgress = await UserProgress.findOneAndUpdate(
		{ userId,examId,selectedSection },
		{ answeredQuestions, unansweredQuestions, selectedOptions,markedForReview},
		{ new: true } // Return the updated document
	  );
  
	  // If not found, return a 404 error
	  if (!updatedProgress) {
		return res.status(404).json({ message: 'User progress not found' });
	  }
  
	  // Return the updated progress
	  return res.status(200).json(updatedProgress);
	} catch (error) {
	  console.error('Error updating user progress:', error);
	  return res.status(500).json({ message: 'Error updating user progress' });
	}
  };