import UserProgress from "../models/userProgress.model.js";

export const getUserProgress = async (req, res) => {
	try {
		const {userId} = req.body;
		const {examId} = req.body;
	  // Find the user's progress by their ID
	  const userProgress = await UserProgress.findOne({ userId });
	  if (!userProgress) {
		// If no progress found, create a new record with default values
		const newUserProgress = new UserProgress({ userId, examId });
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
	  const { userId } = req.body; // Assuming user ID is available via auth middleware
	  const { answeredQuestions, unansweredQuestions,selectedOptions,markedForReview } = req.body;
	  // Find the user's progress and update it
	  const updatedProgress = await UserProgress.findOneAndUpdate(
		{ userId },
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