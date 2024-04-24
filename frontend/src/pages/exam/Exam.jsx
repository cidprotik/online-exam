
import React, { useState,useEffect } from "react";

import ExamHeader from "../../components/exam/ExamHeader";
import QuestionSection from "../../components/exam/QuestionSection";
import SideButton from "../../components/exam/SideButton";
function Exam() {
  
  

  return (
    <>
      <div className="wrapper">
        <div className="page-wrapper">
          <ExamHeader />
          {/*end row*/}
          <div className="row">
            <QuestionSection />
            <SideButton />
          </div>
          {/*end row*/}
        </div>
      </div>
    </>
  );
}

export default Exam;
