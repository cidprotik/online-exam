import React, { useState } from 'react'
import useExamStore from '../../zustand/useExamStore';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

import EditExamModal from '../modal/EditExamModal';
import { useExamStatus } from '../../hooks/useExam';

const StartComponent = ({exam}) => {
  const {loading,examstatus} = useExamStatus();
  const { setExam } = useExamStore();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const userType = authUser.userType;
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(exam.status);

  const examDateTime = new Date(exam.date_time);
  const day = String(examDateTime.getDate()).padStart(2, '0');
  const month = String(examDateTime.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = examDateTime.getFullYear();

  const examDate = `${day}-${month}-${year}`;
  const examTime = examDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  console.log("first", examTime);
  const enterExam = () => {
    setExam(exam); // set the current exam as the selected exam
    
    if(userType === 'admin') {
      navigate('/examdetails',{ state: { examId: exam._id,examName:exam.examname,section:exam.sectionData.length } });
    }
    else{
      navigate('/instraction');
    }
  };

  const toggleModal = () => {
    
    setShowModal(!showModal);
    
  };

  const handleCheckboxChange = () => {
    const confirmChange = window.confirm("Are you sure you want to change the status?");
  
    if (confirmChange) {
      const newStatus = status === "active" ? "deactive" : "active";
      examstatus({examId: exam._id,status: newStatus})
      setStatus(newStatus);
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
          Total Section{" "}
          <span className="badge bg-success rounded-pill">{exam.sectionData.length}</span>
        </li>
        <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
          Exam Date{" "}
          <span className="badge bg-primary rounded-pill">{examDate}</span>
        </li>
        <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
          Exam Time{" "}
          <span className="badge bg-orange-600 rounded-pill">{examTime}</span>
        </li>
      </ul>
      <div className="d-flex justify-content-center my-4">
          {userType === "admin" ?(
          <>
          <label className="cursor-pointer label mr-2" style={{marginTop:"-5px"}}>
          <span className="label-text mr-1">Status</span> 
          <input
              type="checkbox"
              id="statusToggle"
              className="toggle toggle-success"
              checked={status === "active"}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="statusToggle" className="ml-2 mb-0">
              {status === "active" ? "Active" : "Inactive"}
            </label>
          </label>
            
            <button className="btn btn-sm mr-4 btn-warning" onClick={toggleModal}>
              Edit
            </button>
            {showModal && <EditExamModal examData={exam} onClose={toggleModal} />}
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