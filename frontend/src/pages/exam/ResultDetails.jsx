import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSubmitExam } from '../../hooks/useExam';
import useGetAllQuestion from '../../hooks/useGetAllQuestion';
import { write } from 'xlsx';

const ResultDetails = () => {
  const location = useLocation();
  const { examId, userId, examName } = location.state;
  
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [summary, setSummary] = useState({
    answered: 0,
    totalCorrect: 0,
    totalWrong: 0,
    correctMarks: 0,
    negativeMarks: 0,
    marksObtain: 0
  });
  const { getallquestion } = useGetAllQuestion();
  const { submitting, submitexam } = useSubmitExam();

  const fetchResults = async () => {
    const submitData = {
      examId,
      userId,
      submit: false,
    };

    const data = await submitexam(submitData);

    setResults(data.results);
    setSummary({
      answered: data.answered,
      totalCorrect: data.totalCorrect,
      totalWrong: data.totalwrong,
      correctMarks: data.correctMarks,
      negativeMarks: data.negativeMarks,
      marksObtain: data.marksObtain
    });
  };

  const fetchQuestions = async () => {
    const datas = await getallquestion(null);
    if (datas) {
      setQuestions(datas.result);
      
      console.log("hello",datas);
    }
  };

  useEffect(() => {
    fetchResults();
    fetchQuestions();
  }, []);

  const getSubmittedAnswer = (questionId) => {
    const result = results.find(result => result.questionId === questionId);
    return  {
      submittedAnswer: result? result.submittedAnswer :null,
      isCorrect: result? result.isCorrect :null,
      marks : result? result.marks :null
    } 
  };

  const renderQuestions = () => {
    let currentSection = '';
    let currentSectionName = '';

    return questions.map((question, index) => {
      const sectionChanged = question.section !== currentSection;
      currentSection = question.section;
      currentSectionName = question.sectionName;
      const {submittedAnswer,isCorrect,marks} = getSubmittedAnswer(question._id);
      
      return (
        <div key={question._id}>
          {sectionChanged && <SectionHeader section={currentSection} sectionName={currentSectionName} />}
          <QuestionCard
            index={index}
            question={question}
            length ={questions.length}
            answer ={question.answer}
            submittedAnswer={submittedAnswer}
            resultData = {{isCorrect,marks}}
          />
        </div>
      );
    });
  };

  return (
    <div className="wrapper">
      <div className="page-wrapper">
        <Header examName={examName} />
        <div className="container">
          <div className="shadow-lg pt-1 mt-5">
            <div className="card-header bg-primary text-white">
              <h3 className="text-lg font-bold text-center">Exam Results for {examName}</h3>
            </div>
            <div className="card-body">
              <div className="overflow-x-auto">
                {questions.length > 0 ? renderQuestions() : <div>No Questions</div>}
                <ResultTable summary={summary} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ examName }) => (
  <div className="card radius-10 border-start border-info" style={{
    position: 'fixed',
    top: '0px',
    left: '20px',
    right: '20px',
    zIndex: 500,
  }}>
    <div className="p-2">
      <div className="d-flex align-items-center justify-content-between">
        <UserInfo />
        <UserInfo />
      </div>
    </div>
  </div>
);

const UserInfo = () => (
  <div className="d-flex align-items-center" role="button">
    <img src="assets/images/avatars/avatar-2.png" className="user-img" alt="user avatar" />
    <div className="user-info ps-3">
      <p className="user-name mb-0">Pauline Seitz</p>
      <p className="designattion mb-0">Web Designer</p>
    </div>
  </div>
);

const SectionHeader = ({ section,sectionName}) => (
  <div className="section-header d-flex justify-content-center ">
    <h4 className=' bg-accent px-3 py-2 mb-4 rounded'>{section} &#10144; {sectionName}</h4>
  </div>
);

const QuestionCard = ({ index, question, length,answer,submittedAnswer,resultData }) => (
  <div className="card radius-10">
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center">
      <div className="mt-5 mt-md-3 pb-2 d-flex justify-content-between w-100 border-bottom">
        <span>
          <b className="text-white ml-2">
            Questions: <span className="quest_num_show">{index + 1}</span> / {length}
          </b>
        </span>
        <span className="text-white bold mr-2">Marks: {question.rightMark}</span>
      </div>
    </div>
    <div className="card-body2">
      <div className="mt-3 questions_panel">
        <div className="d-flex flex-start">
          <div className="fs-5 text-white">{index + 1}.&nbsp;</div>
          <div>
            <p className="fs-5 text-white" id="question_title" style={{ textAlign: 'justify' }}>
              <span className="question_title text-white">{question.q_title}</span>
            </p>
          </div>
        </div>
        <div className="radio-options" style={{
                position: 'static',
                bottom: 'auto',
                width: '100%',
                padding: '0',
                margin: '0',
              }}>
                {['option1', 'option2', 'option3', 'option4'].map((option, index) => (
                  <label key={option} htmlFor={option} className={answer === option && submittedAnswer === option ? 'labelselected ' : (answer === option ? 'labelselected ' : (submittedAnswer === option ? 'labelwrong' : ''))}>
                    <input
                      type="radio"
                      id={option}
                      className="options"
                      checked={answer === option}
                    />
                    <span className={answer === option && submittedAnswer === option ? 'selectspan' : (answer === option ? 'selectspan2 ' : (submittedAnswer === option ? 'wrongspan' : ''))}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    &nbsp;
                    <text className={answer === option || submittedAnswer === option ? 'text-white' : ''}>
                    {question[option]}
                    </text>
                  </label>
                ))}
            </div>
        {/* <div className="radio-options" style={{
          position: 'static',
          bottom: 'auto',
          width: '100%',
          padding: '0',
          margin: '0',
        }}>
          {['option1', 'option2', 'option3', 'option4'].map((option, optionIndex) => (
            <label key={`${question._id}-${option}`} htmlFor={`${question._id}-${option}`}>
              <input
                type="radio"
                id={`${question._id}-${option}`}
                name={`question-${question._id}`}
                className="options"
                onChange={() => handleChange(option, question._id)}
              />
              <span>
                {String.fromCharCode(65 + optionIndex)}
              </span>
              &nbsp;
              <span>
                {question[option]}
              </span>
            </label>
          ))}
        </div> */}
      </div>
    </div>
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center border-top mt-4" >
      <div className=" p-2 d-flex justify-content-between w-100 border-bottom">
      <span>
  <b className="text-white ml-2">
    Status: {
      resultData.isCorrect === null ? 
        <span className="">Not Answered </span> :
      resultData.isCorrect === false ?
        <span className="text-danger">Wrong Answered &#10006;</span> :
      resultData.isCorrect === true ?
        <span className="text-success">Correct Answered &#10004;</span> :
        null // Handle any other case
    }
  </b>
</span>
        <span className="text-white bold mr-2">Marks Gained : {resultData?.marks || 0} </span>
      </div>
    </div>
  </div>
);

const ResultTable = ({ summary }) => (
  <table className="table w-full">
    <thead className='bg-primary text-white'>
      <tr>
        {/* <th className='text-center border-2'>Name</th>
        <th className='text-center border-2'>UserName</th> */}
        <th className='text-center border-2'>Answered</th>
        <th className='text-center border-2'>Correct Answer</th>
        <th className='text-center border-2'>Wrong Answer</th>
        <th className='text-center border-2'>Correct Marks</th>
        <th className='text-center border-2'>Negative Marks</th>
        <th className='text-center border-2'>Marks Obtains</th>
      </tr>
    </thead>
    
    <tbody>
      
          <tr className="hover:bg-gray-100" style={{ borderBottom: '2px solid #ccc' }}>

            <td className='text-center border-2'>{summary.answered}</td>
            <td className='text-center border-2'>{summary.totalCorrect}</td>
            <td className='text-center border-2'>{summary.totalWrong}</td>
            <td className='text-center border-2'>{summary.correctMarks}</td>
            <td className='text-center border-2'>{summary.negativeMarks}</td>
            <td className='text-center border-2'>{summary.marksObtain}</td>
            
          </tr>
        
    </tbody>
  </table>
);

export default ResultDetails;
