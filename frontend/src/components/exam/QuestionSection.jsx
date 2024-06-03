import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';
import useGetAllQuestion from '../../hooks/useGetAllQuestion';
import useSubmitAnswer from '../../hooks/useSubmitAnswer';
import { useSectionStore } from '../../zustand/useAnswerStore';
import { saveUserProgress } from '../../hooks/useUserProgress';

const QuestionSection = ({ currentQuestionIndex, setQuestionIndex, selectedOptions, selectedSection }) => {
  const useAnswerStore = useSectionStore(selectedSection);
  const {
    setSelectedOption,
    getSelectedOption,
    clearSelectedOption,
    addAnsweredQuestion,
    addUnansweredQuestion,
    removeAnsweredQuestion,
    removeUnansweredQuestion,
    addMarkedForReview,
    removeMarkedForReview,
    isMarkedForReview,
  } = useAnswerStore();

  const [markedForReview, setMarkedForReview] = useState(isMarkedForReview(currentQuestionIndex));
  const [selectedOption, setSelectedOptionLocal] = useState(null);
  const { getallquestion } = useGetAllQuestion();
  const [questions, setQuestions] = useState([]);
  const [contentOverflow, setContentOverflow] = useState(false);
  const { sendAnswer } = useSubmitAnswer();
  const { saveProgress } = saveUserProgress();

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getallquestion(selectedSection);
      if (data) {
        setQuestions(data.result);
      }
    };

    fetchQuestions();
  }, [selectedSection]);

  useEffect(() => {
    const cardBody = document.querySelector('.card-body2');

    if (cardBody && cardBody.scrollHeight > cardBody.clientHeight) {
      setContentOverflow(true);
    } else {
      setContentOverflow(false);
    }
  }, [currentQuestionIndex, questions,selectedSection]);

  useEffect(() => {
    const storedOption = getSelectedOption(currentQuestionIndex);
    const mark= isMarkedForReview(currentQuestionIndex);
  
    setSelectedOptionLocal(storedOption);
    
    if (!mark && (storedOption === undefined || storedOption === null)) {
      addUnansweredQuestion(currentQuestionIndex);
    } 
   
    }, [selectedOptions,currentQuestionIndex,getSelectedOption]);

    useEffect(() => {
      setMarkedForReview(isMarkedForReview(currentQuestionIndex));
    }, [currentQuestionIndex]);

  const handleChange = (optionId) => {
    setSelectedOptionLocal(optionId);
  };

  

  const handleClearResponse = async () => {
    setSelectedOptionLocal(null);
    removeAnsweredQuestion(currentQuestionIndex);
    addUnansweredQuestion(currentQuestionIndex);
    clearSelectedOption(currentQuestionIndex);
    removeMarkedForReview(currentQuestionIndex);
    setMarkedForReview(false);

    const progressData = {
      answeredQuestions: useAnswerStore.getState().answeredQuestions,
      unansweredQuestions: useAnswerStore.getState().unansweredQuestions,
      selectedOptions: useAnswerStore.getState().selectedOptions,
      selectedSection: selectedSection,
    };

    await saveProgress(progressData);
  };

  const handleNextQuestion = async () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion && selectedOption) {
      const apiData = {
        questionId: currentQuestion._id,
        answer: selectedOption,
      };

      await sendAnswer(apiData);
      setSelectedOption(currentQuestionIndex, selectedOption);
      addAnsweredQuestion(currentQuestionIndex);
      removeUnansweredQuestion(currentQuestionIndex);
      if (markedForReview) {
        addMarkedForReview(currentQuestionIndex);
      } else {
        removeMarkedForReview(currentQuestionIndex);
      }
    } else {
      if (markedForReview) {
        addMarkedForReview(currentQuestionIndex);
        removeUnansweredQuestion(currentQuestionIndex);
      } else {
        addUnansweredQuestion(currentQuestionIndex);
        removeMarkedForReview(currentQuestionIndex);
      }
    }

    const progressData = {
      answeredQuestions: useAnswerStore.getState().answeredQuestions,
      unansweredQuestions: useAnswerStore.getState().unansweredQuestions,
      selectedOptions: useAnswerStore.getState().selectedOptions,
      markedForReview: useAnswerStore.getState().markedForReview,
      selectedSection: selectedSection,
    };

    await saveProgress(progressData);

    if (currentQuestionIndex < questions.length - 1) {
      setQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  const handleMarkForReview = (e) => {
    if (e.target.checked) {
      setMarkedForReview(true);
    } else {
      setMarkedForReview(false);
    }
  };

  const handleFullscreenToggle = () => {
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        screenfull.request(document.documentElement);
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  let isCodingQuestion = false;
  if (currentQuestion) {
    isCodingQuestion = currentQuestion.q_title.trim().startsWith('#');
  }

  return (
    <div className="col-12 col-lg-8">
      <div className="card radius-10" style={{ height: "590px", position: "relative" }}>
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center">
          <div className="mt-5 mt-md-3 pb-2 d-flex justify-content-between w-100 border-bottom">
            <span>
              <b className="text-white ml-2">
                Questions : <span className="quest_num_show">{currentQuestionIndex + 1}</span> / {questions.length}
              </b>
            </span>
            <span className="text-white bold mr-2">Marks : {currentQuestion?.marks || 0}</span>
          </div>
        </div>
        <div className="card-body2" style={{ maxHeight: '320px', overflowY: contentOverflow ? 'auto' : 'visible', width: '100%' }}>
          {currentQuestion && (
            <div className="mt-3 questions_panel">
              <div className="d-flex flex-start">
                <div className="fs-5 text-white">{currentQuestionIndex + 1}.&nbsp;</div>
                <div>
                  <p className="fs-5 text-white" id="question_title" style={{ textAlign: 'justify' }}>
                    {isCodingQuestion ? (
                      <pre className="question_title text-white" style={{ whiteSpace: 'pre-wrap' }}>
                        {currentQuestion.q_title}
                      </pre>
                    ) : (
                      <span className="question_title text-white">{currentQuestion.q_title}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="radio-options" style={{
                position: contentOverflow ? 'absolute' : 'static',
                bottom: contentOverflow ? '65px' : 'auto',
                width: '100%',
                padding: '0',
                margin: '0',
              }}>
                {['option1', 'option2', 'option3', 'option4'].map((option, index) => (
                  <label key={option} htmlFor={option} className={selectedOption === option ? 'labelselected' : ''}>
                    <input
                      type="radio"
                      id={option}
                      className="options"
                      checked={selectedOption === option}
                      onChange={() => handleChange(option)}
                    />
                    <span className={selectedOption === option ? 'selectspan' : ''}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    &nbsp;
                    <text className={selectedOption === option ? 'text-white' : ''}>
                      {currentQuestion[option]}
                    </text>
                  </label>
                ))}
              </div>
              <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center border-top" style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
              }}>
                <div className="col">
                  <div className="p-3">
                    <input
                      type="checkbox"
                      id="markForReviewCheckbox"
                      className="checkbox checkbox-accent"
                      style={{ margin: "0 10px -5px 0" }}
                      checked={markedForReview}
                      onChange={handleMarkForReview}
                    />
                    <label htmlFor="markForReviewCheckbox" className="text-white">
                      Mark For Review
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="p-3">
                    <button className="btn btn-sm" onClick={handleClearResponse}>Clear Response</button>
                    <button onClick={handleFullscreenToggle}>Toggle Fullscreen</button>
                  </div>
                </div>
                <div className="col">
                  <div className="p-3">
                    <button className="btn btn-sm btn-warning" onClick={handlePreviousQuestion}>
                      Previous
                    </button>
                    <button className="btn btn-sm btn-accent ml-3" onClick={handleNextQuestion}>
                      Save & Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
