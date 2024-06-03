import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetResults } from '../../hooks/useExam';

const Results = () => {

  const location = useLocation();
  const { examId, examName } = location.state;
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const { loading, getresults } = useGetResults();


  const fetchResults = async () => {
    const data = await getresults({ examId});
    if (data) {
      setResults(data.result);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDetailsClick = (userId) => {
    navigate('/result-details',{ state: { examId,userId,examName}});
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
          <div className=" shadow-lg pt-1 mt-5">
            <div className="card-header bg-primary text-white">
              <h3 className="text-lg font-bold text-center">Exam Questions for {examName}</h3>
            </div>
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className='bg-primary text-white'>
                    <tr>
                      <th className='text-center border-2'>Rank</th>
                      <th className='text-center border-2'>Name</th>
                      <th className='text-center border-2'>UserName</th>
                      <th className='text-center border-2'>Answered</th>
                      <th className='text-center border-2'>Correct Answer</th>
                      <th className='text-center border-2'>Wrong Answer</th>
                      <th className='text-center border-2'>Correct Marks</th>
                      <th className='text-center border-2'>Negative Marks</th>
                      <th className='text-center border-2'> Marks Obtains</th>
                      <th className='text-center border-2'> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.length > 0 ?(
                    results.map((result, index) => (
                      <tr key={result.id} className="hover:bg-gray-100" style={{ borderBottom: '2px solid #ccc' }}>
                        <td className='text-center border-2'>{index + 1}</td>
                        <td className='text-center border-2'>{result.userId.fullName}</td>
                        <td className='text-center border-2'>{result.userId.username}</td>
                        <td className='text-center border-2'>{result.answered}</td>
                        <td className='text-center border-2'>{result.totalCorrect}</td>
                        <td className='text-center border-2'>{result.totalwrong}</td>
                        <td className='text-center border-2'>{result.correctMarks}</td>
                        <td className='text-center border-2'>{result.negativeMarks}</td>
                        <td className='text-center border-2'>{result.marksObtain}</td>
                        <td className='text-center border-2'>
                          <button className="btn btn-primary btn-xs" onClick={() => handleDetailsClick(result.userId._id)}>Details</button>
                        </td>
                      </tr>
                    )))
                  :(
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        NoOne Submitted The Exam Yet
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
  );
}

export default Results;
