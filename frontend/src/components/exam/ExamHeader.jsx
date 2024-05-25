import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import useExamStore from '../../zustand/useExamStore';
import ExamEndModal from '../modal/ExamEndModal';
import { useAuthContext } from "./../../context/AuthContext";
import useLogout from '../../hooks/useLogout';
import { useGetCountdown } from '../../hooks/useExam';

const ExamHeader = () => {
  const { loading, logout: performLogout } = useLogout();
  const {  getcountdown } = useGetCountdown();
  const { authUser } = useAuthContext();
  const { selectedExam } = useExamStore();
  const duration = selectedExam.duration * 60 * 1000; // Exam duration in milliseconds

  const countdownEndKey = 'countdownEndTime';
  const remainingTimeKey = 'remainingTime';
  const [endTime, setEndTime] = useState(null);
  const [isExamEnded, setIsExamEnded] = useState(false);
  console.log("first",authUser);
  useEffect(() => {
    const fetchCountdownEndTime = async () => {
     const response = await getcountdown({ userId: authUser._id, examId: selectedExam._id });
     console.log("hhh",response)
     const storedEndTime = response.data?.endTime;
     console.log("ggg",storedEndTime)
      if (storedEndTime) {
        setEndTime(storedEndTime);
        setIsExamEnded(Date.now() >= storedEndTime);
        localStorage.setItem(countdownEndKey, storedEndTime);
      } else {
        const currentTime = Date.now();
        const newEndTime = currentTime + duration;
        setEndTime(newEndTime);
        localStorage.setItem(countdownEndKey, newEndTime);
      }
    };
  
    fetchCountdownEndTime();
  }, [duration, authUser.id, selectedExam.id]);

  const onCountdownComplete = () => {
    setIsExamEnded(true);
    //localStorage.removeItem(countdownEndKey);
    //localStorage.removeItem(remainingTimeKey);
  };

  const handleLogout = async () => {
    const remainingTime = endTime - Date.now();
    const countdownEndTime = Date.now() + remainingTime;
  
    // // Save countdown end time to backend
    // await axios.post('/api/exam/save-countdown-end-time', {
    //   userId: authUser.id,
    //   examId: selectedExam.id,
    //   endTime: countdownEndTime,
    // });

    await fetch('/api/exam/save-countdown-end-time', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: authUser.id, examId: selectedExam.id, endTime: countdownEndTime, })
    });
  
    // Proceed with the logout process
    localStorage.setItem(remainingTimeKey, remainingTime);
    await performLogout();
  };

  return (
    <>
      <ExamEndModal
        isOpen={isExamEnded}
        onClose={() => setIsExamEnded(false)}
        message="The exam has ended."
      />
      <div className="row">
        <div className="col">
          <div className="card radius-10 border-start border-info">
            <div className="p-2">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img 
                    src="assets/images/cidlogo.png"
                    className="user-img bg-white p-1"
                    alt="CID logo"
                  />
                  <div className="user-info ps-3">
                    <p className="user-name mb-0">CID</p>
                    <p className="designation mb-0">West Bengal</p>
                  </div>
                </div>
                <div>
                  {endTime && (
                    <Countdown
                      date={endTime}
                      onComplete={onCountdownComplete}
                      renderer={({ hours, minutes, seconds }) => (
                        <span className="countdown text-2xl">
                          {hours > 0 ? `${hours}:` : ''}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </span>
                      )}
                    />
                  )}
                </div>
                <a className="d-flex align-items-center" role="button" data-bs-toggle="dropdown">
                  <img
                    src="assets/images/avatars/avatar-2.png"
                    className="user-img"
                    alt="user avatar"
                  />
                  <div className="user-info ps-3">
                    <p className="user-name mb-0">{authUser.fullName}</p>
                    <p className="mb-0 hover:text-green-500">{authUser.username}</p>
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  {!loading ? (
                    <li className="cursor-pointer">
                      <a className="dropdown-item" onClick={handleLogout}>
                        <i className="bx bx-log-out-circle"></i>
                        <span className="ml-4">Logout</span>
                      </a>
                    </li>
                  ) : (
                    <span className="loading loading-spinner">Loading...</span>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamHeader;
