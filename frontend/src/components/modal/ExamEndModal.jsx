import React from 'react';
import useExamStore from "../../zustand/useExamStore";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useSubmitExam } from '../../hooks/useExam';

const ExamEndModal = ({ isOpen, onClose, message }) => {

  const { authUser } = useAuthContext();
  const { selectedExam } = useExamStore();
  const userId = authUser._id;
  const examId = selectedExam._id;
  const navigate = useNavigate();
  const {submitting,submitexam} = useSubmitExam();

  if (!isOpen) return null;

  const handleSubmitExam = async() => {
    const submitData = {
      examId,
      userId,
      submit:true,
    };

    // await submitexam(submitData);
    // navigate('/examsubmit');
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
            <button className="btn btn-success" onClick={handleSubmitExam}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamEndModal;
