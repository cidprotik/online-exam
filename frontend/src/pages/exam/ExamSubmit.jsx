import React from 'react';

const ExamSubmit = () => {
    return (
        <div className="d-flex vh-100 bg-forgot justify-content-center align-items-center">
          <div className='card-container w-80'>
            <div className="logincard" style={{borderRadius: "10%"}}>
              <div className="card-body">
                <div className="d-flex justify-content-center my-3">
                  <h2 style={{fontWeight: "bolder", fontSize: "25px"}}>Your Exam Summary</h2>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                  Total Questions
                  <span className="badge bg-primary rounded-pill">100</span>
                </li>
                <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                  Total Time
                  <span className="badge bg-warning rounded-pill">90 minutes</span>
                </li>
                <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                  Total Answered
                  <span className="badge bg-success rounded-pill">80</span>
                </li>
                <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                  Not Answered
                  <span className="badge bg-primary rounded-pill">20</span>
                </li>
                <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">
                  Time Taken
                  <span className="badge bg-orange-600 rounded-pill">80</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    };

export default ExamSubmit;
