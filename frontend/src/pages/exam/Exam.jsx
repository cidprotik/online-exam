
import React, { useState,useEffect } from "react";
import ExamHeader from "../../components/exam/ExamHeader";
import QuestionSection from "../../components/exam/QuestionSection";
import SideButton from "../../components/exam/SideButton";
import useAnswerStore from '../../zustand/useAnswerStore';
import {getUserProgress} from "../../hooks/useUserProgress";
function Exam() {

  const { setAnsweredQuestions, setUnansweredQuestions } = useAnswerStore();
  const { getProgress } = getUserProgress();

  useEffect(() => {
    const fetchUserProgress = async () => {
      const data = await getProgress();
      const { answeredQuestions, unansweredQuestions } = data;
      setAnsweredQuestions(answeredQuestions); // Update global state
        setUnansweredQuestions(unansweredQuestions);
    };

    fetchUserProgress(); // Fetch progress on component mount (i.e., login)
  }, []);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Define function to update the question index
  const handleSetQuestionIndex = (newIndex) => {
    setCurrentQuestionIndex(newIndex);
  };

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
            <QuestionSection currentQuestionIndex={currentQuestionIndex} setQuestionIndex={handleSetQuestionIndex}/>
            <SideButton onSidebarClick={handleSidebarClick} />
          </div>
          {/*end row*/}
        </div>
      </div>
    </>
  );
}

export default Exam;
