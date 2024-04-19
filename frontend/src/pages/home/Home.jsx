import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const Home = () => {
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/exam/getexam", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ examId: "66221b8fb36e4f3bdfa18d07" }),
            });
            const data = await res.json();
            setData(data.result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!data) {
        return null; // Render nothing until data is fetched
    }

    const examDate = new Date(data.examdate);
    const examTime = new Date(data.examtime);
    const examDateTime = new Date(examDate.getFullYear(), examDate.getMonth(), examDate.getDate(), examTime.getHours(), examTime.getMinutes(), examTime.getSeconds());

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
            <div className="card radius-10 border-start border-info">
                <div className="p-2">
                    <div className="d-flex align-items-center justify-content-around">
                        <Countdown
                            date={examDateTime} // Set the countdown end time to the exam date and time
                            renderer={({ completed, formatted: { hours, minutes, seconds } }) => {
                                if (completed) {
                                    setShowModal(true); // If countdown completes, show the modal
                                    return null;
                                } else {
                                    return (
                                        <span className="countdown text-2xl">
                                            {hours < 10 ? `0${hours}` : hours}:
                                            {minutes < 10 ? `0${minutes}` : minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </span>
                                    );
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Countdown Complete!</h2>
                        <p>It's time to take the exam!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
