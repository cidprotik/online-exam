import { useState } from "react";
import { toast } from "react-hot-toast";



export const useAddExam= () => {
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

export const useEditExam= () => {
	const [loading, setLoading] = useState(false);
    
	const editexam = async (formData) => {
		console.log("llll", formData);
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

export const useExamStatus= () => {
	const [loading, setLoading] = useState(false);
    
	const examstatus = async (formData) => {
		
		setLoading(true);
		try {
			const res = await fetch("/api/exam/deactiveexam", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            toast.success("Exam Status Updated Successfully");

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, examstatus};
};

export const useGetCountdown= () => {
	
	const getcountdown = async (formData) => {
		try {
			const res = await fetch("/api/exam/get-countdown-end-time", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			return data;

		} catch (error) {
			toast.error(error.message);
		} 
	};

	return { getcountdown};
};