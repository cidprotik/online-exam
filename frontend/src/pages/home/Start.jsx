import { useEffect, useState } from "react";

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
      console.log(data);
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
  <div style={{width:"500px"}}>
    <div className="logincard" style={{borderRadius:"10%"}}>
      <div className="card-body">
        <div className="d-flex justify-content-center my-3">
          <h2 style={{fontWeight:"bolder",fontSize:"25px"}}>{exam.examname}</h2>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
          Total Questions{" "}
          <span className="badge bg-primary rounded-pill">{exam.totalquestion}</span>
        </li>
        <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
          Total Times{" "}
          <span className="badge bg-warning rounded-pill">{exam.duration} minutes</span>
        </li>
        <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
          Right Answer{" "}
          <span className="badge bg-success rounded-pill">{exam.rightmark}</span>
        </li>
        <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
          Wrong Answer{" "}
          <span className="badge bg-danger rounded-pill">-{exam.wrongmark}</span>
        </li>
      </ul>
      <div className="d-flex justify-content-center my-4">
        <button className="btn btn-sm btn-primary">Enter to the Exam</button>
      </div>
    </div>
  </div>
      ))}
</div>

      </div>
    </div>
  );
};

export default Start;
