import React, { useState } from 'react';
import Countdown from 'react-countdown';
import useExamStore from '../../zustand/useExamStore';
import ExamEndModal from '../modal/ExamEndModal';
import { useAuthContext } from "./../../context/AuthContext";
import useLogout from '../../hooks/useLogout';

const ExamHeader = () => {
  const {loading, logout} = useLogout();
  const { authUser } = useAuthContext();
  const { selectedExam } = useExamStore();
  const duration = selectedExam.duration * 60 * 1000; // 50 minutes in milliseconds

  const countdownEndKey = 'countdownEndTime';
  const currentTime = Date.now(); // Current time in milliseconds
  let endTime = localStorage.getItem(countdownEndKey);

  const [isExamEnded, setIsExamEnded] = useState(currentTime >= endTime);

  if (!endTime) {
    endTime = currentTime + duration;
    localStorage.setItem(countdownEndKey, endTime);
  } else {
    endTime = parseInt(endTime);
  }

  const onCountdownComplete = () => {
    setIsExamEnded(true);
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
                  alt="user avatar"
                />
                <div className="user-info ps-3">
                  <p className="user-name mb-0">CID</p>
                  <p className="designation mb-0">West Bengal</p>
                </div>
              </div>
              <div>
                <Countdown
                  date={endTime} // Use the stored end time
                  onComplete={onCountdownComplete}
                  renderer={({ hours, minutes, seconds }) => (
                    <span className="countdown text-2xl">
                      {hours > 0 ? `${hours}:` : ''}
                      {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                  )}
                />
              </div>
              <a className="d-flex align-items-center" role="button" data-bs-toggle="dropdown">
                <img
                  src="assets/images/avatars/avatar-2.png"
                  className="user-img"
                  alt="user avatar"
                />
                <div className="user-info ps-3">
                  <p className="user-name mb-0">{authUser.fullName}</p>
                  <p className="mb-0  hover:text-green-500">{authUser.username}</p>
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
              {!loading ? (<>
							<li className='cursor-pointer'><a className="dropdown-item" onClick={logout}><i className='bx bx-log-out-circle'></i><span className='ml-4'>Logout</span></a>
							</li>
              </>) : (<span className='loading loading-spinner'>Loading...</span>)}
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
