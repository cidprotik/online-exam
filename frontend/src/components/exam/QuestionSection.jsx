import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';
import useGetAllQuestion from '../../hooks/useGetAllQuestion';
import useSubmitAnswer from '../../hooks/useSubmitAnswer';

const QuestionSection = () => {
  const { getallquestion, loading } = useGetAllQuestion();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { sendAnswer } = useSubmitAnswer();

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getallquestion();
      if (data) {
        setQuestions(data.result);
      }
    };

    fetchQuestions(); // Call the fetching function once when component mounts
  }, []);

  const [contentOverflow, setContentOverflow] = useState(false);
  
  useEffect(() => {
    const cardBody = document.querySelector('.card-body2');
  
    if (cardBody.scrollHeight > cardBody.clientHeight) {
      setContentOverflow(true);
    } else {
      setContentOverflow(false);
    }
  }, [currentQuestionIndex, questions]);

  const [selectedOption, setSelectedOption] = useState(null);


  // const postAnswerToAPI = async (data) => {
  //   try {
  //     const response = await fetch('/api/submit-answer', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to submit the answer');
  //     }
  //   } catch (error) {
  //     console.error('Error posting to API:', error);
  //     alert('An error occurred while submitting your answer. Please try again.');
  //   }
  // };


  const handleChange = (optionId) => {
    setSelectedOption(optionId);
    const selectedLabel = document.querySelector(`label[for=${optionId}]`);

    document.querySelectorAll(".radio-options label").forEach((label) => {
      label.classList.remove("labelselected");
      label.querySelector("span").style.backgroundColor = "#4b525a";
      label.style.color = "#333";
      label.style.borderColor = "#ccc";
    });

    selectedLabel.classList.add("labelselected");
    selectedLabel.querySelector("span").style.backgroundColor = "#08fb0c";
    selectedLabel.style.color = "#08fb0c";
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Clear the selected option for the next question
      
      const apiData = {
        questionId: questions[currentQuestionIndex]._id,
        answer: selectedOption,
      };

      if(apiData.answer)
      {
        await sendAnswer(apiData);
      }

      document.querySelectorAll(".radio-options label").forEach((label) => {
        label.classList.remove("labelselected");
        label.querySelector("span").style.backgroundColor = "#4b525a"; // Original background color
        label.style.color = "#333"; // Original text color
        label.style.borderColor = "#ccc"; // Original border color
      });

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
              <div className="card radius-10" style={{ height: "590px", position: "relative" }}>
                <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center">
                  <div className="mt-5 mt-md-3 pb-2 d-flex justify-content-between w-100 border-bottom">
                    <span>
                      <b className="text-white ml-2">
                        Questions : <span className="quest_num_show">{currentQuestionIndex + 1}</span> /
                        {questions.length}
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
            <span className="question_title text-white">{currentQuestion.q_title}</span>
          </p>
        </div>
      </div>

      <div className="radio-options" style={{ position: contentOverflow ? 'absolute' : 'static', bottom: contentOverflow ? '65px' : 'auto', width: '100%', padding: '0', margin: '0' }}>
      <label
                        htmlFor="option1"
                        className={
                          selectedOption === "option1" ? "labelselected" : ""
                        }
                      >
                        <input
                          type="radio"
                          id="option1"
                          className="options"
                          checked={selectedOption === "option1"}
                          onChange={() => handleChange("option1")}
                        />
                        <span>A</span>&nbsp;{currentQuestion.option1}
                      </label>

                      <label
                        htmlFor="option2"
                        className={
                          selectedOption === "option2" ? "labelselected" : ""
                        }
                      >
                        <input
                          type="radio"
                          id="option2"
                          className="options"
                          checked={selectedOption === "option2"}
                          onChange={() => handleChange("option2")}
                        />
                        <span>B</span>&nbsp; {currentQuestion.option2}
                      </label>

                      <label
                        htmlFor="option3"
                        className={
                          selectedOption === "option3" ? "labelselected" : ""
                        }
                      >
                        <input
                          type="radio"
                          id="option3"
                          className="options"
                          checked={selectedOption === "option3"}
                          onChange={() => handleChange("option3")}
                        />
                        <span>C</span>&nbsp;{currentQuestion.option3}
                      </label>

                      <label
                        htmlFor="option4"
                        className={
                          selectedOption === "option4" ? "labelselected" : ""
                        }
                      >
                        <input
                          type="radio"
                          id="option4"
                          className="options"
                          checked={selectedOption === "option4"}
                          onChange={() => handleChange("option4")}
                        />
                        <span>D</span>&nbsp;{currentQuestion.option4}
                      </label>
      </div>
      <div
                      class="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center border-top"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                      }}
                    >
                      <div class="col">
                        <div class="p-3">
                          <input
                            type="checkbox"
                            id="markForReviewCheckbox"
                            className="checkbox checkbox-accent"
                            style={{ margin: "0 10px -5px 0" }}
                          />
                          <label
                            for="markForReviewCheckbox"
                            className="text-white"
                          >
                            Mark For Review
                          </label>
                        </div>
                      </div>
                      <div class="col">
                        <div class="p-3">
                          <button className="btn btn-sm">Clear Response</button>
                          <button onClick={handleFullscreenToggle}>Toggle Fullscreen</button>
                        </div>
                      </div>
                      <div class="col">
                        <div class="p-3">
                          <button className="btn btn-sm btn-outline btn-warning " onClick={handlePreviousQuestion}>
                            Previous
                          </button>
                          <button className="btn btn-sm btn-outline btn-accent ml-3" onClick={handleNextQuestion}>
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
