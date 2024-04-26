
import React, { useState,useEffect } from "react";

import ExamHeader from "../../components/exam/ExamHeader";
import QuestionSection from "../../components/exam/QuestionSection";
import SideButton from "../../components/exam/SideButton";
function Exam() {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // This function updates the current question index
  const handleSidebarClick = (index) => {
    setCurrentQuestionIndex(index - 1); // Subtract 1 because index is 1-based
  };  

  return (
    <>
      <div className="wrapper">
        <div className="page-wrapper">
          <ExamHeader />
          {/*end row*/}
          <div className="row">
            <QuestionSection currentQuestionIndex={currentQuestionIndex} />
            <SideButton onSidebarClick={handleSidebarClick} />
          </div>
          {/*end row*/}
        </div>
      </div>
    </>
  );
}

export default Exam;
