import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import useExamStore from '../../zustand/useExamStore';
import ExamEndModal from '../modal/ExamEndModal';
import { useAuthContext } from "./../../context/AuthContext";
import useLogout from '../../hooks/useLogout';
import { useGetCountdown, useSaveCountdown } from '../../hooks/useExam';


const ExamHeader = () => {
  const { loading, logout: performLogout } = useLogout();
  const { authUser } = useAuthContext();
  const { selectedExam } = useExamStore();
  const duration = selectedExam.duration * 60 * 1000; // Exam duration in milliseconds
  const {  getcountdown } = useGetCountdown();
  const { savecountdown } = useSaveCountdown();

  const [endTime, setEndTime] = useState(null);
  const [isExamEnded, setIsExamEnded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTime = Date.now();
        const response = await getcountdown({ userId: authUser._id, examId: selectedExam._id });
  
        let storedEndTime = response?.storedEndTime ?? null;
        let remainingTime = response?.remainingTime ?? null;

        if (remainingTime) {
          remainingTime = parseInt(remainingTime, 10);
          storedEndTime = currentTime + remainingTime;
          await savecountdown({ userId: authUser._id, examId: selectedExam._id, remainingTime:null })
        } else if (!storedEndTime) {
          storedEndTime = currentTime + duration;
        } else {
          storedEndTime = parseInt(storedEndTime, 10);
        }
        await savecountdown({ userId: authUser._id, examId: selectedExam._id, storedEndTime })

        setEndTime(storedEndTime);
        setIsExamEnded(currentTime >= storedEndTime);
  
      } catch (error) {

        console.error("Error fetching countdown:", error);
      }
    };
  
    fetchData(); // Call the asynchronous function immediately
  
  }, [duration, authUser._id, selectedExam._id]); // Add dependencies to the dependency array
  

  const onCountdownComplete = () => {
    setIsExamEnded(true);
  };

  const handleLogout = async () => {
    const remainingTime = endTime - Date.now();
    await savecountdown({ userId: authUser._id, examId: selectedExam._id, remainingTime });
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
