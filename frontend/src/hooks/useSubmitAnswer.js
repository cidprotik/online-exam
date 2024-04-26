
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import useExamStore from "../zustand/useExamStore";

const useSubmitAnswer = () => {
	const { authUser } = useAuthContext();
    const { selectedExam } = useExamStore();
    const userId = authUser._id;
    const examId = selectedExam._id;

	const sendAnswer = async (answer) => {
        const dataToSend = {
            ...answer,  // Include existing answer fields
            examId,     // Add examId
            userId
        };
        console.log(dataToSend);
        try {
            const res = await fetch("/api/answer/addanswer", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify( dataToSend ),
			});

            // If the response is not ok, handle the error
            if (!res.ok) {
                throw new Error("Failed to fetch questions");
            }

            const data = await res.json();
            return data;
        } catch (error) {
            const errorMessage = error.message || "An unexpected error occurred";
            toast.error(errorMessage);
        } 
    };

	return { sendAnswer };
};

export default useSubmitAnswer