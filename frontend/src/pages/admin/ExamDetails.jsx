import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetAllQuestionAdmin } from '../../hooks/useQuestion';
import useExcelUpload from '../../hooks/useExcelUpload';
import AddQuestionModal from '../../components/modal/AddQuestionModal';

const ExamDetails = () => {

  const location = useLocation();
  const { examId, examName,section } = location.state;
  const { allQuestions } = useGetAllQuestionAdmin();
  const [questions, setQuestions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { loading, uploadexcel } = useExcelUpload();


  const fetchQuestions = async () => {
    const data = await allQuestions({ examId: examId });
    
    if (data) {
      setQuestions(data.result);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('examId', examId);
        await uploadexcel(formData);
        setSelectedFile(null);
        document.getElementById("formFile").value = null;
        await fetchQuestions();
        document.getElementById("uploadExcelModal").checked = false; 
      } else {
        console.error('No file selected');
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleAddQuestion = async () => {
    await fetchQuestions();
    document.getElementById("addQuestionModal").checked = false;
  };

  return (
    <div className="wrapper">
      <div className="page-wrapper">
        <div className="card radius-10 border-start border-info" style={{
          position: 'fixed',
          top: '0px',
          left: '20px',
          right: '20px',
          zIndex: 500,
        }}>
          <div className="p-2">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="d-flex align-items-center" href="#" role="button">
                  <img src="assets/images/avatars/avatar-2.png" className="user-img" alt="user avatar" />
                  <div className="user-info ps-3">
                    <p className="user-name mb-0">Pauline Seitz</p>
                    <p className="designattion mb-0">Web Designer</p>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="uploadExcelModal" className="btn btn-sm btn-primary mr-2">Upload Excel</label>
                <label htmlFor="addQuestionModal" className="btn btn-sm btn-primary ml-2">Add Questions</label>
              </div>
              <div>
                <div className="d-flex align-items-center" href="#" role="button">
                  <img src="assets/images/avatars/avatar-2.png" className="user-img" alt="user avatar" />
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
          <div className="card2 shadow-lg pt-1">
            <div className="card-header bg-primary text-white">
              <h3 className="text-lg font-bold text-center">Exam Questions for {examName}</h3>
            </div>
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className='bg-primary text-white'>
                    <tr>
                      <th className='text-center border-2'>Sl No</th>
                      <th className='text-center border-2'>Section</th>
                      <th className='text-center border-2'>Question</th>
                      <th className='text-center border-2'>Option1</th>
                      <th className='text-center border-2'>Option2</th>
                      <th className='text-center border-2'>Option3</th>
                      <th className='text-center border-2'>Answer</th>
                      <th className='text-center border-2'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.length > 0 ?(
                    questions.map((question, index) => (
                      <tr key={question.id} className="hover:bg-gray-100" style={{ borderBottom: '2px solid #ccc' }}>
                        <td className='text-center border-2'>{index + 1}</td>
                        <td className='text-center border-2'>{question.section}</td>
                        <td className='text-center border-2'>{question.q_title}</td>
                        <td className='text-center border-2'>{question.option1}</td>
                        <td className='text-center border-2'>{question.option2}</td>
                        <td className='text-center border-2'>{question.option3}</td>
                        <td className='text-center border-2'>{question.answer}</td>
                        <td className='text-center border-2'>
                          <button className="btn btn-warning btn-xs mr-2">Edit</button>
                          <button className="btn btn-danger btn-xs">Delete</button>
                        </td>
                      </tr>
                    )))
                  :(
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No questions added
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <input type="checkbox" id="uploadExcelModal" className="modal-toggle"/>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Upload Excel File</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Select Excel file</label>
              <input className="form-control" type="file" id="formFile" accept=".csv, .xls, .xlsx" onChange={handleFileChange}/>
            </div>
          </form>
          <div className="modal-action">
            <label htmlFor="uploadExcelModal" className="btn">Close</label>
            <button type="button" className="btn btn-primary" onClick={handleUpload}>{loading ? (<span className="loading loading-spinner"></span>):(<span>Submit</span>)}</button>
          </div>
        </div>
      </div>
      <AddQuestionModal
        onClose={() => document.getElementById("addQuestionModal").checked = false}
        onSave={handleAddQuestion}
        sectionLength ={section}
        examId = {examId}
      />
    </div>
  );
}

export default ExamDetails;
