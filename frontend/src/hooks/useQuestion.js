import { useState } from "react";
import { toast } from "react-hot-toast";



export const useAddQuestion= () => {
	const [loading, setLoading] = useState(false);
    
	const addexam = async (formData) => {
		
		setLoading(true);
		try {
			const res = await fetch("/api/exam/addexam", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            toast.success("New exam added successfully");
            console.log(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, addexam};
};

export const useEditQuestion= () => {
	const [loading, setLoading] = useState(false);
    
	const editexam = async (formData) => {
		
		setLoading(true);
		try {
			const res = await fetch("/api/exam/editexam", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            toast.success("Exam Edited Successfully");
            console.log(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, editexam};
};

export const useGetAllQuestionAdmin= () => {
	
	const allQuestions = async (examId) => {
		
		
		try {
			const res = await fetch("/api/question/getallquestion", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(examId),
			});
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

	return {  allQuestions};
};

