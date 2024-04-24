import React from 'react';
import useExamStore from "../../zustand/useExamStore";

const ExamEndModal = ({ isOpen, onClose, message }) => {

 const { selectedExam } = useExamStore();

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Call the onClose function to close the modal
    onClose();
  };

  return (
    <>
      <input
        type="checkbox"
        id="exam-modal"
        className="modal-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="modal">
        <div className="modal-box ">
          <div className='d-flex justify-center pb-4'>
             <h3 className="font-bold text-lg">{selectedExam.examname}</h3>
          </div>
          <hr />
          <div className='d-flex justify-center'>
            <p className="py-4">{message}</p>
          </div>
          <hr />
          <div className="modal-action d-flex justify-center ">
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamEndModal;
