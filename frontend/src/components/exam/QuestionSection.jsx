import React,{ useState,useEffect } from 'react'
import screenfull from 'screenfull';
import useGetAllQuestion from '../../hooks/useGetAllQuestion';

const QuestionSection = () => {
  const { getallquestion, loading } = useGetAllQuestion();
  const [questions, setQuestions] = useState([]);

  const [contentOverflow, setContentOverflow] = useState(false);
  useEffect(() => {
    const cardBody = document.querySelector('.card-body2');
    if (cardBody.scrollHeight > cardBody.clientHeight) {
      setContentOverflow(true);
    } else {
      setContentOverflow(false);
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getallquestion();
      console.log(data) // Fetch the questions
      if (data) {
        setQuestions(data.result); // Update the state with the fetched data
      }
    };

    fetchQuestions(); // Call the fetching function
  }, []); 


  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (optionId) => {
    console.log(optionId);
    setSelectedOption(optionId);
    const selectedLabel = document.querySelector(`label[for=${optionId}]`);

    // Reset background color and text color for all labels
    document.querySelectorAll(".radio-options label").forEach((label) => {
      label.classList.remove("labelselected");
      label.querySelector("span").style.backgroundColor = "#4b525a";
      label.style.color = "#333";
      label.style.borderColor = "#ccc";
    });

    // Change background color and text color for the selected label
    selectedLabel.classList.add("labelselected");
    selectedLabel.querySelector("span").style.backgroundColor = "#08fb0c";
    selectedLabel.style.color = "#08fb0c";
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    screenfull.on('change', () => {
      setIsFullscreen(screenfull.isFullscreen);
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && screenfull.isFullscreen) {
        screenfull.exit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFullscreenToggle = () => {
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        screenfull.request(document.documentElement);
      }
    } else {
      console.error('Fullscreen mode is not supported');
    }
  };


  return (
    <div className="col-12 col-lg-8">
              <div className="card radius-10" style={{ height: "590px", position: "relative" }}>
                <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center">
                  <div className="mt-5 mt-md-3 pb-2 d-flex justify-content-between w-100 border-bottom">
                    <span>
                      <b className="text-white ml-2">
                        Questions : <span className="quest_num_show">4</span> /
                        5
                      </b>
                    </span>

                    <span className="text-white bold mr-2">Marks : 5</span>
                  </div>
                </div>
                <div className="card-body2" style={{ maxHeight: "320px", overflowY: contentOverflow ? 'auto' : 'visible' }}>
                  
                  <div className="mt-3 questions_panel quest4" id={4}>
                    <div className="d-flex flex-start">
                      <div className="fs-5 text-white">4.&nbsp;</div>
                      <div>
                        <p
                          className="fs-5 text-white"
                          id="question_title"
                          style={{ textAlign: "justify" }}
                        >
                          <span className="question_title text-white ">
                            Now is the winter of our discontent Made glorious
                            summer by this sun of York; And all the clouds that
                            lour'd upon our house In the deep bosom of the ocean
                            buried. Now are our brows bound with victorious
                            wreaths; Our bruised arms hung up for monuments; Our
                            stern alarums changed to merry meetings
                            
                            
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="radio-options" style={{ position: contentOverflow ? 'absolute' : 'static', bottom: contentOverflow ? "65px" : 'auto' }}>
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
                        <span>A</span>&nbsp; India
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
                        <span>B</span>&nbsp; Now is the winter of our discontent Made glorious Now is the winter of our discontent Made gloriousNow is 
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
                        <span>C</span>&nbsp; USA
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
                        <span>D</span>&nbsp; England
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
                          <button className="btn btn-sm btn-outline btn-warning ">
                            Previous
                          </button>
                          <button className="btn btn-sm btn-outline btn-accent ml-3">
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default QuestionSection