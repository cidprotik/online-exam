import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useExamStore from "../zustand/useExamStore";

const useGetAllQuestion = () => {
    const [loading, setLoading] = useState(false);
    const { selectedExam } = useExamStore();
    const examId = selectedExam?._id;

    const getallquestion = async (section) => {
        console.log("section", section);
        // Check if section is undefined, if so, return early
        if (section === undefined) {
            return;
        }
    
        setLoading(true);
        try {
            const res = await fetch("/api/question/getallquestion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ examId, section}),
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
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        if (examId) {
            getallquestion();
        }
    }, []); // add examId to dependency array

    return { getallquestion, loading };
};

export default useGetAllQuestion;
