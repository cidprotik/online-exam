import React, { useState } from 'react';
import Countdown from 'react-countdown';
import useExamStore from '../../zustand/useExamStore';

const ExamHeader = () => {
  const { selectedExam } = useExamStore();
  const duration = selectedExam.duration * 60 * 1000; // 50 minutes in milliseconds

  const countdownEndKey = 'countdownEndTime';

  const currentTime = Date.now(); // Current time in milliseconds
  let endTime = localStorage.getItem(countdownEndKey);

  if (!endTime) {
    // If there's no stored end time, set a new one
    endTime = currentTime + duration;
    localStorage.setItem(countdownEndKey, endTime);
  } else {
    endTime = parseInt(endTime);
  }
  const [showModal, setShowModal] = useState(false);
  
  if (currentTime >= endTime) {
    setShowModal(true);
  }

  return (
    <>
    <div className="row">
      <div className="col">
        <div className="card radius-10 border-start border-info">
          <div className="p-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  src="assets/images/avatars/avatar-2.png"
                  className="user-img"
                  alt="user avatar"
                />
                <div className="user-info ps-3">
                  <p className="user-name mb-0">Pauline Seitz</p>
                  <p className="designation mb-0">Web Designer</p>
                </div>
              </div>
              <div>
                <Countdown
                  date={endTime} // Use the stored end time
                  renderer={({ hours, minutes, seconds }) => (
                    <span className="countdown text-2xl">
                      {hours > 0 ? `${hours}:` : ''}
                      {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                  )}
                />
              </div>
              <div className="d-flex align-items-center">
                <img
                  src="assets/images/avatars/avatar-2.png"
                  className="user-img"
                  alt="user avatar"
                />
                <div className="user-info ps-3">
                  <p className="user-name mb-0">Pauline Seitz</p>
                  <p className="designation mb-0">Web Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Submit Your Exam</Modal.Title>
    </Modal.Header>
    <Modal.Body>Time's up! Would you like to submit your exam?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={() => {
        // Handle exam submission logic here
        setShowModal(false); // Close modal after submitting
      }}>
        Submit Exam
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  );
};

export default ExamHeader;
