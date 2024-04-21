import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const Home = () => {
    const [data, setData] = useState(null);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/exam/getexam", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ examId: "66229c5e8fedcd74e81d9e00" }),
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
    const examTime = data.examtime;
const [hours, minutes] = examTime.split(':');
const examDateTime = new Date(examDate.getFullYear(), examDate.getMonth(), examDate.getDate(), parseInt(hours), parseInt(minutes));

const handleComplete = () => {
    setCompleted(true);
};

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
            <div className={completed ? "card2 radius-10" : "card radius-10"}>
                <div className="p-2">
                    <div className="d-flex align-items-center justify-content-around">
                    <Countdown
    date={examDateTime}
    renderer={({ completed, formatted: { hours, minutes, seconds } }) => {
        if (completed) {
            handleComplete();
            return (
                <button className="btn btn-success " style={{ borderWidth: "2px" }}>Start</button>
            );
        } else {
            return (
                <span className="countdown text-2xl">
                    {hours > 0 && hours < 10 ? `${hours}:` : ''}
                    {minutes < 10 ? `${minutes}` : minutes}:
                    {seconds < 10 ? `${seconds}` : seconds}
                </span>
            );
        }
    }}
/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
