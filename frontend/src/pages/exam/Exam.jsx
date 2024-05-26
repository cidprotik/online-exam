
import React, { useState,useEffect } from "react";
import ExamHeader from "../../components/exam/ExamHeader";
import QuestionSection from "../../components/exam/QuestionSection";
import SideButton from "../../components/exam/SideButton";
import useAnswerStore from '../../zustand/useAnswerStore';
import {getUserProgress} from "../../hooks/useUserProgress";
import useExamStore from "../../zustand/useExamStore";
function Exam() {

  const { setAnsweredQuestions, setUnansweredQuestions,fetchSelectedOptions,setMarkedForReview } = useAnswerStore();
  const [firstOption, setFirstOption] = useState(null);
  const { getProgress } = getUserProgress();
  const { selectedExam } = useExamStore();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [sectionName, setSectionName] = useState("");
  console.log(activeSectionIndex)
  const extractFirstOption = (options) => {
    const firstEntry = Object.entries(options)[0];
    if (firstEntry) {
      const [key, value] = firstEntry;
      if (key === "0") {
        return value; // Return firstValue if firstKey is '0'
      }
    }
    return null; // Otherwise return null
  };

  useEffect(() => {
    const fetchUserProgress = async () => {
      const sectionn = `section${activeSectionIndex + 1}`;
      const data = await getProgress(sectionn);
      
      const { answeredQuestions, unansweredQuestions,selectedOptions,markedForReview } = data;
      setAnsweredQuestions(answeredQuestions); // Update global state
        setUnansweredQuestions(unansweredQuestions);
        setFirstOption(extractFirstOption(selectedOptions));
        setMarkedForReview(markedForReview);
        fetchSelectedOptions(selectedOptions)
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

  const handleSectionClick = (index,sectionName) => {
    setSectionName(sectionName); 
    setActiveSectionIndex(index); // Set the clicked section as active
    setCurrentQuestionIndex(0);
  };

  return (
    <>
      <div className="wrapper">
        <div className="page-wrapper">
          <ExamHeader />
          <div className="d-flex flex-wrap mb-3">
            {selectedExam.sectionData.map((section, index) => (
              <div key={index} className="p-2">
                <button
                  type="button"
                  className={`btn btn-sm ${index === activeSectionIndex ? "btn-success active-button" : " "}`} // Add active class
                  onClick={() => handleSectionClick(index,section.sectionName)}
                >
                  {section.sectionName}
                </button>
              </div>
            ))}
          </div>

          <div className="row">
            <QuestionSection currentQuestionIndex={currentQuestionIndex} setQuestionIndex={handleSetQuestionIndex} selectedOptions={firstOption} selectedSection={ activeSectionIndex + 1}/>
            <SideButton onSidebarClick={handleSidebarClick} />
          </div>
          {/*end row*/}
        </div>
      </div>
    </>
  );
}

export default Exam;
