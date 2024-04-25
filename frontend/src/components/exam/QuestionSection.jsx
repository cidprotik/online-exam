import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';
import useGetAllQuestion from '../../hooks/useGetAllQuestion';

const QuestionSection = () => {
  const { getallquestion, loading } = useGetAllQuestion();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getallquestion();
      if (data) {
        setQuestions(data.result);
      }
    };

    fetchQuestions(); // Call the fetching function once when component mounts
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Clear the selected option for the next question
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null); // Clear the selected option for the previous question
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

  const currentQuestion = questions[currentQuestionIndex]; // Get the current question

  return (
    <div className="col-12 col-lg-8">
      <div className="card radius-10" style={{ height: '590px', position: 'relative' }}>
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center">
          <div className="mt-5 mt-md-3 pb-2 d-flex justify-content-between w-100 border-bottom">
            <span>
              <b className="text-white ml-2">
                Question {currentQuestionIndex + 1} / {questions.length}
              </b>
            </span>
            <span className="text-white bold mr-2">Marks: {currentQuestion?.marks || 0}</span>
          </div>
        </div>
        <div className="card-body2" style={{ maxHeight: '320px', overflowY: 'auto' }}>
          {currentQuestion && (
            <div className="mt-3 questions_panel">
              <div className="d-flex flex-start">
                <div className="fs-5 text-white">{currentQuestionIndex + 1}.&nbsp;</div>
                <div>
                  <p className="fs-5 text-white" style={{ textAlign: 'justify' }}>
                  <span className="question_title text-white ">
                    {currentQuestion.q_title}
                    </span>
                  </p>
                </div>
              </div>

              <div className="radio-options" style={{ position: 'static' , bottom: "65px"  }}>
                <label htmlFor="option1" className={selectedOption === 'option1' ? 'labelselected' : ''}>
                  <input
                    type="radio"
                    id="option1"
                    checked={selectedOption === 'option1'}
                    onChange={() => handleChange('option1')}
                  />
                  <span>A</span>&nbsp; {currentQuestion.option1}
                </label>

                <label htmlFor="option2" className={selectedOption === 'option2' ? 'labelselected' : ''}>
                  <input
                    type="radio"
                    id="option2"
                    checked={selectedOption === 'option2'}
                    onChange={() => handleChange('option2')}
                  />
                  <span>B</span>&nbsp; {currentQuestion.option2}
                </label>

                <label htmlFor="option3" className={selectedOption === 'option3' ? 'labelselected' : ''}>
                  <input
                    type="radio"
                    id="option3"
                    checked={selectedOption === 'option3'}
                    onChange={() => handleChange('option3')}
                  />
                  <span>C</span>&nbsp; {currentQuestion.option3}
                </label>

                <label htmlFor="option4" className={selectedOption === 'option4' ? 'labelselected' : ''}>
                  <input
                    type="radio"
                    id="option4"
                    checked={selectedOption === 'option4'}
                    onChange={() => handleChange('option4')}
                  />
                  <span>D</span>&nbsp; {currentQuestion.option4}
                </label>
              </div>

              <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center border-top"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}>
                <div className="col">
                  <div className="p-3">
                    <input type="checkbox" id="markForReviewCheckbox" />
                    <label htmlFor="markForReviewCheckbox" className="text-white">
                      Mark for Review
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="p-3">
                    <button className="btn btn-sm btn-outline" onClick={handleFullscreenToggle}>
                      Toggle Fullscreen
                    </button>
                  </div>
                </div>
                <div className="col">
                  <div className="p-3">
                    <button className="btn btn-sm btn-outline btn-warning" onClick={handlePreviousQuestion}>
                      Previous
                    </button>
                    <button className="btn btn-sm btn-outline btn-accent" onClick={handleNextQuestion}>
                      Next & Save
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
