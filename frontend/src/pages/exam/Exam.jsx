
import Countdown from "react-countdown";
import React, { useState,useEffect } from "react";
import screenfull from 'screenfull';
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

  const [contentOverflow, setContentOverflow] = useState(false);
  console.log(contentOverflow);
  useEffect(() => {
    const cardBody = document.querySelector('.card-body2');
    if (cardBody.scrollHeight > cardBody.clientHeight) {
      setContentOverflow(true);
    } else {
      setContentOverflow(false);
    }
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
    <>
      <div className="wrapper">
        <div className="page-wrapper">
          <div className="row">
            <div className="col">
              <div className="card radius-10 border-start  border-info">
                <div className="p-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div
                        className="d-flex align-items-center"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="assets/images/avatars/avatar-2.png"
                          className="user-img"
                          alt="user avatar"
                        />
                        <div className="user-info ps-3">
                          <p className="user-name mb-0">Pauline Seitz</p>
                          <p className="designattion mb-0">Web Designer</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Countdown
                        date={Date.now() + 10000000} // adjust the time as needed (in milliseconds)
                        renderer={({ hours, minutes, seconds }) => (
                          <span className="countdown text-2xl">
                            {hours < 10 ? `0${hours}` : hours}:
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                          </span>
                        )}
                      />
                    </div>
                    <div>
                      <div
                        className="d-flex align-items-center"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="assets/images/avatars/avatar-2.png"
                          className="user-img"
                          alt="user avatar"
                        />
                        <div className="user-info ps-3">
                          <p className="user-name mb-0">Pauline Seitz</p>
                          <p className="designattion mb-0">Web Designer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="row">
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
            <div className="col-12 col-lg-4">
              <div className="card radius-10">
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <div className="w-50">
                      <p
                        className="bg-primary mb-2 pb-1 text-white text-center bold"
                        style={{ borderRadius: "20px", marginTop: "-10px" }}
                      >
                        Total Question : 100
                      </p>
                    </div>
                  </div>
                  <div id="card_body2" className="showNumberBox">
                    <div className="row mx-1 mb-3">
                      <div
                        className="answer-instruction bg-success text-white rounded d-inline text-center pt-2 col-auto"
                        style={{ width: 40, height: 38 }}
                      >
                        <b>1</b>
                      </div>
                      <span className="text-white bold col mt-2">Answered</span>
                      <div
                        className="notanswer-instruction bg-danger text-white rounded d-inline text-center pt-2 col-auto"
                        style={{ width: 40, height: 38 }}
                      >
                        2
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
                        3
                      </div>
                      <span className="text-white bold col mt-2">
                        Not Visited
                      </span>
                      <div
                        className="markforreview-instruction bg-warning text-white rounded d-inline text-center pt-2 col-auto"
                        style={{ width: 40, height: 38 }}
                      >
                        0
                      </div>
                      <span className="text-white bold col mt-2">
                        Marked for Review
                      </span>
                    </div>

                    <p className="bg-info mt-2 p-2 text-white text-center">
                      Mathematics Language
                    </p>
                    <div
                      className="question-numberboard text-center"
                      style={{ margin: "2rem -1.2rem 1rem -2px" }}
                    >
                      <div className="scrollable-container">{boxes}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
        </div>
      </div>
    </>
  );
}

export default Exam;
