import { useEffect, useState } from "react";
import StartComponent from "../../components/home/startComponent";

const Start = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/exam/getexamall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setData(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!data) {
    return null; // Render nothing until data is fetched
  }

  return (
    <div className="wrapper bg-forgot">
      <div className="page-wrapper">
      <div className="d-flex justify-content-around align-items-center flex-wrap mt-10">
      {data.map((exam, index) => (
        <StartComponent
        key={exam._id}
        exam = {exam}
        />
      ))}
</div>

      </div>
    </div>
  );
};

export default Start;
