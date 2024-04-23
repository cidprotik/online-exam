import React from 'react'

const SideButton = () => {
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
  )
}

export default SideButton