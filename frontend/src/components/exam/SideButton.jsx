import React, { useEffect, useState } from 'react'
import useGetAllQuestion from '../../hooks/useGetAllQuestion';
import useAnswerStore from '../../zustand/useAnswerStore';

const SideButton = ({ onSidebarClick }) => {
  const { answeredQuestions,unansweredQuestions,markedForReview  } = useAnswerStore();
  const { getallquestion, loading } = useGetAllQuestion();
  const [questions, setQuestions] = useState([]);

  const answermark = answeredQuestions.filter(index =>
    markedForReview.includes(index)
  );
  const onlymark = markedForReview.length - answermark.length;
  const answerno = answeredQuestions.length-answermark.length;
  const notvisited = questions.length -( answerno + onlymark + unansweredQuestions.length + answermark.length);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getallquestion();
      if (data) {
        setQuestions(data.result);
      }
    };

    fetchQuestions(); // Call the fetching function once when component mounts
  }, []);

  
  return (
    <div className="col-12 col-lg-4">
              <div className="card radius-10">
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <div className="w-50">
                      <p
                        className="bg-primary mb-2 pb-1 text-white text-center bold"
                        style={{ borderRadius: "20px", marginTop: "-10px" }}
                      >
                        Total Question : {questions.length}
                      </p>
                    </div>
                  </div>
                  <div id="card_body2" className="showNumberBox">
                    <div className="row mx-1 mb-3">
                      <div
                        className="answer-instruction bg-success text-white rounded d-inline text-center pt-2 col-auto"
                        style={{ width: 40, height: 38 }}
                      >
                        <b>{answerno}</b>
                      </div>
                      <span className="text-white bold col mt-2">Answered</span>
                      <div
                        className="notanswer-instruction bg-danger text-white rounded d-inline text-center pt-2 col-auto"
                        style={{ width: 40, height: 38 }}
                      >
                        {unansweredQuestions.length}
                      </div>
                      <span className="text-white bold col mt-2">
                        Not Answered
                      </span>
                    </div>
                    <div className="row mx-1 mb-3">
                      <div
                        className="notvisited-instruction bg-secondary text-white rounded d-inline text-center pt-2 col-auto"
                        style={{ width: 40, height: 38 }}
                      >
                       {notvisited}
                      </div>
                      <span className="text-white bold col mt-2">
                        Not Visited
                      </span>
                      <div
                        className="markforreview-instruction bg-warning text-white rounded d-inline text-center pt-2 col-auto"
                        style={{ width: 40, height: 38 }}
                      >
                        {onlymark}
                      </div>
                      <span className="text-white bold col mt-2">
                        Marked for Review
                      </span>
                    </div>
                    <div className="row mx-1 mb-3">
                      <div
                        className="answered-review bg-warning text-white rounded d-inline text-center pt-2 col-auto"
                        style={{ width: 40, height: 38,position: "relative"}}
                      >
                       {answermark.length}
                       <div className="inner-box rounded"></div>
                      </div>
                      <span className="text-white bold col mt-2">
                        Answered & Mark for Review
                      </span>
                      
                    </div>

                    <p className="bg-info mt-2 p-2 text-white text-center">
                      Mathematics Language
                    </p>
                    <div
                      className="question-numberboard text-center"
                      style={{ margin: "2rem -1.2rem 1rem -2px" }}
                    >
                      {questions.map((_, index) => (
        <div key={index} class="scrollable-container">
          <div
            className={`box rounded cursor-pointer text-white ${
              markedForReview.includes(index)
                ?'bg-warning'
                :
              answeredQuestions.includes(index)
                ? 'bg-success' // Green for answered
                : unansweredQuestions.includes(index)
                ? 'bg-danger' // Red for unanswered
                
                : 'bg-secondary' // Default gray for not attempted
            }`}
            onClick={() => onSidebarClick(index + 1)}
          >
            {index + 1}
            {answeredQuestions.includes(index) && markedForReview.includes(index) ? (
               <div className="inner-box rounded"></div> // Only if both conditions are met
              ) : null}
          </div>
        </div>
      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default SideButton