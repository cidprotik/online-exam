import React, { useState, useEffect } from "react";
import ExamHeader from "../../components/exam/ExamHeader";
import QuestionSection from "../../components/exam/QuestionSection";
import SideButton from "../../components/exam/SideButton";

import { useSectionStore } from '../../zustand/useAnswerStore';
import { getUserProgress } from "../../hooks/useUserProgress";
import useExamStore from "../../zustand/useExamStore";

function Exam() {
  const [selectSection, setSelectSection] = useState('section1');
  const [sectionName, setSectionName] = useState();
  const useAnswerStore = useSectionStore(selectSection);
  const { setAnsweredQuestions, setUnansweredQuestions, fetchSelectedOptions, setMarkedForReview } = useAnswerStore();
  const [firstOption, setFirstOption] = useState(null);
  const { getProgress } = getUserProgress();
  const { selectedExam } = useExamStore();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  

  const extractFirstOption = (options) => {
    const firstEntry = Object.entries(options)[0];
    if (firstEntry) {
      const [key, value] = firstEntry;
      if (key === "0") {
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchUserProgress = async () => {
      
      const data = await getProgress(selectSection);
      const { answeredQuestions, unansweredQuestions, selectedOptions, markedForReview } = data;
      setAnsweredQuestions(answeredQuestions);
      setUnansweredQuestions(unansweredQuestions);
      setFirstOption(extractFirstOption(selectedOptions));
      setMarkedForReview(markedForReview);
      fetchSelectedOptions(selectedOptions);
    };

    fetchUserProgress();
  }, [activeSectionIndex]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleSetQuestionIndex = (newIndex) => {
    setCurrentQuestionIndex(newIndex);
  };

  const handleSidebarClick = (index) => {
    setCurrentQuestionIndex(index - 1);
  };

  const handleSectionClick = (index, sectionName) => {
    setSelectSection(`section${index + 1}`);
    setSectionName(sectionName);
    setActiveSectionIndex(index);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="wrapper">
      <div className="page-wrapper">
        <ExamHeader />
        <div className="d-flex flex-wrap mb-3">
          {selectedExam.sectionData.map((section, index) => (
            <div key={index} className="p-2">
              <button
                type="button"
                className={`btn btn-sm ${index === activeSectionIndex ? "btn-success active-button" : " "}`}
                onClick={() => handleSectionClick(index, section.sectionName)}
              >
                {section.sectionName}
              </button>
            </div>
          ))}
        </div>
        <div className="row">
          
            <QuestionSection
              currentQuestionIndex={currentQuestionIndex} 
              setQuestionIndex={handleSetQuestionIndex} 
              selectedOptions={firstOption} 
              selectedSection={selectSection}
            />
             <SideButton onSidebarClick={handleSidebarClick}  selectedSection={selectSection} sectionName={sectionName}/>
        </div>
      </div>
    </div>
  );
}

export default Exam;
