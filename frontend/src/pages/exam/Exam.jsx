
import React, { useState,useEffect } from "react";

import ExamHeader from "../../components/exam/ExamHeader";
import QuestionSection from "../../components/exam/QuestionSection";
function Exam() {
  const boxes = [];

  // Generate 20 boxes
  for (let i = 1; i <= 100; i++) {
    boxes.push(
      <div key={i} className="box rounded bg-secondary">
        {i}
        <div className="inner-box rounded"></div>
      </div>
    );
  }
  

  return (
    <>
      <div className="wrapper">
        <div className="page-wrapper">
          <ExamHeader />
          {/*end row*/}
          <div className="row">
            <QuestionSection />
            
          </div>
          {/*end row*/}
        </div>
      </div>
    </>
  );
}

export default Exam;
