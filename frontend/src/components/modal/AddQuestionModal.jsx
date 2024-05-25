import React, { useState } from 'react';
import { useAddQuestion } from '../../hooks/useQuestion';

const AddQuestionModal = ({ onClose, onSave,sectionLength,examId}) => {
    const { loading, addquestion } = useAddQuestion();
    const [section, setSection] = useState('section1');
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answer, setAnswer] = useState('');
    const [errors, setErrors] = useState({
      section: '',
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: ''
    });
  
    const handleSave = async () => {
      let isError = false;
      const newErrors = {
        section: '',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: ''
      };
  
      if (!section) {
        newErrors.section = 'Section is required.';
        isError = true;
      }
      if (!question) {
        newErrors.question = 'Question is required.';
        isError = true;
      }
      if (!option1) {
        newErrors.option1 = 'Option 1 is required.';
        isError = true;
      }
      if (!option2) {
        newErrors.option2 = 'Option 2 is required.';
        isError = true;
      }
      if (!option3) {
        newErrors.option3 = 'Option 3 is required.';
        isError = true;
      }
      if (!option4) {
        newErrors.option4 = 'Option 4 is required.';
        isError = true;
      }
      if (!answer) {
        newErrors.answer = 'Answer is required.';
        isError = true;
      }
  
      if (isError) {
        setErrors(newErrors);
        return;
      }
  
      const newQuestion = {
        examId,
        section,
        q_title: question,
        option1,
        option2,
        option3,
        option4,
        answer,
      };
      await addquestion(newQuestion);
      onSave(true);
      resetForm();
    };
  
    const resetForm = () => {
      setSection('');
      setQuestion('');
      setOption1('');
      setOption2('');
      setOption3('');
      setOption4('');
      setAnswer('');
      setErrors({
        section: '',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: ''
      });
    };
  
    const handleSectionChange = (value) => {
      setSection(value);
      setErrors({ ...errors, section: '' });
    };
  
    const handleQuestionChange = (value) => {
      setQuestion(value);
      setErrors({ ...errors, question: '' });
    };
  
    const handleOption1Change = (value) => {
      setOption1(value);
      setErrors({ ...errors, option1: '' });
    };
  
    const handleOption2Change = (value) => {
      setOption2(value);
      setErrors({ ...errors, option2: '' });
    };
  
    const handleOption3Change = (value) => {
      setOption3(value);
      setErrors({ ...errors, option3: '' });
    };
  
    const handleOption4Change = (value) => {
      setOption4(value);
      setErrors({ ...errors, option4: '' });
    };
  
    const handleAnswerChange = (value) => {
      setAnswer(value);
      setErrors({ ...errors, answer: '' });
    };

  return (
    <>
      <input type="checkbox" id="addQuestionModal" className="modal-toggle" />
      <div className="modal" >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Question</h3>
          <form>
          <div className='row'>
            <div className="mb-3 col-md-12">
              <label className="form-label">Question</label>
              <textarea
                    className="input input-bordered w-full"
                    value={question}
                    onChange={(e) => handleQuestionChange(e.target.value)}
              />
              {errors.question && <p className="text-red-500">{errors.question}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">Option 1</label>
              <input
                className="form-control w-full"
                type="text"
                value={option1}
                onChange={(e) => handleOption1Change(e.target.value)}
              />
              {errors.option1 && <p className="text-red-500">{errors.option1}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">Option 2</label>
              <input
                className="form-control w-full"
                type="text"
                value={option2}
                onChange={(e) => handleOption2Change(e.target.value)}
              />
              {errors.option2 && <p className="text-red-500">{errors.option2}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">Option 3</label>
              <input
                className="form-control w-full"
                type="text"
                value={option3}
                onChange={(e) => handleOption3Change(e.target.value)}
              />
              {errors.option3 && <p className="text-red-500">{errors.option3}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">Option 4</label>
              <input
                className="form-control w-full"
                type="text"
                value={option4}
                onChange={(e) => handleOption4Change(e.target.value)}
              />
              {errors.option4 && <p className="text-red-500">{errors.option4}</p>}
            </div>
            <div className="mb-3 col-6">
                <label className="form-label">Answer</label>
                <select
                className="form-select w-full"
                value={answer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                >
                <option value="">Select an answer</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
                </select>
                {errors.answer && <p className="text-red-500">{errors.answer}</p>}
            </div>
            <div className="mb-3 col-6">
              <label className="form-label">Section</label>
              <select
                className="form-select w-full"
                value={section}
                onChange={(e) => handleSectionChange(e.target.value)}
                >
            {[...Array(sectionLength)].map((_, index) => (
                <option key={index} value={`section${index + 1}`}>
                    Section {index + 1}
                </option>
                ))}    
                
             </select>
             {errors.section && <p className="text-red-500">{errors.section}</p>}
            </div>
           </div>
          </form>
          <div className="modal-action">
            <label htmlFor="addQuestionModal" className="btn">Close</label>
            <button type="button" className="btn btn-primary" onClick={handleSave}>{loading ? (<span className='loading loading-spinner'></span>):(<span>Save</span>)}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQuestionModal;
