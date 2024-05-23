import { useState } from "react";
import toast from "react-hot-toast";

const useExcelUpload= () => {
	const [loading, setLoading] = useState(false);
    
	const uploadexcel = async (formData) => {
		
		setLoading(true);
		try {
			const res = await fetch("/api/question/addexcel", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            toast.success("New Questions added successfully");
            console.log(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, uploadexcel};
};

export default useExcelUpload