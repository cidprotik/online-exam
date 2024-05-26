
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import useExamStore from "../zustand/useExamStore";

export const getUserProgress = () => {
	const { authUser } = useAuthContext();
    const { selectedExam } = useExamStore();
    const userId = authUser._id;
    const examId = selectedExam._id;

	const getProgress = async (section) => {
        const dataToSend = {
            examId,     // Add examId
            userId,
            selectedSection: section
        };
        
        try {
            const res = await fetch("/api/userprogress/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify( dataToSend ),
			});

            // If the response is not ok, handle the error
            if (!res.ok) {
                throw new Error("Failed to fetch User Progess");
            }

            const data = await res.json();
            return data;
        } catch (error) {
            const errorMessage = error.message || "An unexpected error occurred";
            toast.error(errorMessage);
        } 
    };

	return { getProgress };
};

export const saveUserProgress = () => {
	const { authUser } = useAuthContext();
    const { selectedExam } = useExamStore();
    const userId = authUser._id;
    const examId = selectedExam._id;

	const saveProgress = async (progress) => {
        const dataToSend = {
            ...progress,
            examId,     // Add examId
            userId
        };
        console.log("oookkk",dataToSend);
        try {
            const res = await fetch("/api/userprogress/", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify( dataToSend ),
			});

            // If the response is not ok, handle the error
            if (!res.ok) {
                throw new Error("Failed to fetch User Progess");
            }

            const data = await res.json();
            return data;
        } catch (error) {
            const errorMessage = error.message || "An unexpected error occurred";
            toast.error(errorMessage);
        } 
    };

	return { saveProgress };
};