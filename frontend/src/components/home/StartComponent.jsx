import React from 'react'
import useExamStore from '../../zustand/useExamStore';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const StartComponent = ({exam}) => {
  const { setExam } = useExamStore();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const userType = authUser.userType;

  const enterExam = () => {
    setExam(exam); // set the current exam as the selected exam
    
    if(userType === 'admin') {
      navigate('/examdetails');
    }
    else{
      navigate('/instraction');
    }
  };

  return (
    
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
          {userType === "admin" ?(
          <>
            <button className={`btn btn-sm mr-4  disabled ${exam.status === "active" ? "btn-success" : "btn-error"}`}>
              {exam.status === "active" ? "Active" : "Deactive"}
            </button>
            <button className="btn btn-sm ml-4 btn-primary" onClick={enterExam}>Exam Details</button>
          </>  
          ):(<button
            className="btn btn-sm btn-primary"
            onClick={enterExam}
          >
            Enter to the Exam
          </button>)}
          
      </div>
    </div>
  </div>
  )
}

export default StartComponent