import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useGetAllQuestionAdmin } from '../../hooks/useQuestion';

const ExamDetails = () => {

  const location = useLocation();
  const { examId } = location.state;
  const {  allQuestions } = useGetAllQuestionAdmin();
  const [questions, setQuestions] = useState([]);
  console.log(questions)
  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await allQuestions({examId: examId});
      
      if (data) {
        console.log("first",data.result)
        setQuestions(data.result);
       
      }
    };
    
    fetchQuestions();
  }, []);
  
  return (
    <div className="wrapper" >
      <div className="page-wrapper">
      <div className="card radius-5 border-start  border-info " style={{
    position: 'fixed',
    top: '0px', // Adjust the position as needed
    left: '0px', // Keep the element aligned to the left
    right: '0px', // Keep the element aligned to the right, making it full-width
    zIndex: 1000, // Ensures it's on top of other content
  }}>
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
              <div className="container mx-auto mt-5">
      <div className="card2 shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="text-lg font-bold">Exam Questions</h3>
        </div>
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className='text-center'>Sl No</th>
                  <th className='text-center'>Section</th>
                  <th className='text-center'>Question</th>
                  <th className='text-center'>Option1</th>
                  <th className='text-center'>Option2</th>
                  <th className='text-center'>Option3</th>
                  <th className='text-center'>Answer</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={question.id} className="hover:bg-gray-100">
                    <td className='text-center'>{index + 1}</td>
                    <td className='text-center'>{question.section}</td>
                    <td className='text-center'>{question.q_title}</td>
                    <td className='text-center'>{question.option1}</td>
                    <td className='text-center'>{question.option2}</td>
                    <td className='text-center'>{question.option3}</td>
                    <td className='text-center'>{question.answer}</td>
                    <td className='text-center'>
                      <button className="btn btn-warning btn-xs mr-2">Edit</button>
                      <button className="btn btn-danger btn-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</div>
</div>
  )
}

export default ExamDetails