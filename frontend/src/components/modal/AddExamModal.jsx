import React, { useState } from 'react';

const AddExamModal = ({ onClose }) => {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [formData, setFormData] = useState({
    examName: '',
    date_time: '',
    duration: '',
    totalquestion: '',
    sectionData: [], // Add state to manage section data
  });

  const addNewSection = () => {
    setSections([...sections, `Section ${sections.length + 1}`]);
    setFormData({
      ...formData,
      sectionData: [...formData.sectionData, {}], // Add a new section data object
    });
  };

  const handleSectionClick = (index) => {
    setActiveSection(index);
  };

  const removeSection = (indexToRemove) => {
    const newSections = sections
      .filter((_, index) => index !== indexToRemove)
      .map((_, index) => `Section ${index + 1}`);
    const newSectionData = formData.sectionData.filter((_, index) => index !== indexToRemove);
    setSections(newSections);
    setFormData({
      ...formData,
      sectionData: newSectionData,
    });
    setActiveSection(null); // Reset active section when removed
  };

  const handleSectionDataChange = (index, field, value) => {
    const updatedSectionData = [...formData.sectionData];
    updatedSectionData[index] = {
      ...updatedSectionData[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      sectionData: updatedSectionData,
    });
    console.log(formData);
  };

  const handleSubmit = () => {
    // const formData = {
    //   examName: document.getElementById('examName').value,
    //   date_time: document.getElementsByName('date_time')[0].value,
    //   duration: document.getElementById('duration').value,
    //   totalquestion: document.getElementById('totalquestion').value,
    //   sections: sections.map((section, index) => ({
    //     name: section,
    //     total_questions: document.querySelector(`.total_ques_${index + 1}`).value,
    //     max_answers: document.querySelector(`.max_ans_${index + 1}`).value,
    //     right_mark: document.querySelector(`.right_mark_${index + 1}`).value,
    //     wrong_mark: document.querySelector(`.wrong_mark_${index + 1}`).value
    //   }))
    // };
  
    // Call function or API endpoint to handle form submission
    //console.log(formData); // For demonstration, log form data to console
    onClose();
  };

  return (
    <>
      <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-4xl w-full">
          <div className="mt-3  sm:mt-0 sm:">
            <h3 className="text-lg font-medium text-gray-900 d-flex justify-center">Add New Exam</h3>
            <div className="mt-2">
              <hr />
              <form className='p-4'>
                <div className='row'>
                  <div className="col-md-6 pb-3">
                    <label htmlFor="examName" className="form-label">Exam Name</label>
                    <input type="text" className="form-control" id="examName" name="examName" value={formData.examName} onChange={(e) => setFormData({ ...formData, examName: e.target.value })} />
                  </div>
                  <div className="col-md-6 pb-3">
                    <label className="form-label">Date and Time</label>
                    <input
                      type="datetime-local"
                      name="date_time"
                      className="form-control"
                      onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 pb-3">
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input type="text" className="form-control" id="duration" name="duration" onChange={(e) => setFormData({ ...formData, duration: e.target.value })}/>
                  </div>
                  <div className="col-md-6 pb-3">
                    <label htmlFor="totalquestion" className="form-label">Total Question</label>
                    <input type="number" className="form-control" id="totalquestion" name="totalquestion" onChange={(e) => setFormData({ ...formData, totalquestion: e.target.value })}/>
                  </div>
                  <div className="col-md-6 pb-3">
                    <button type="button" className="btn btn-sm btn-primary" onClick={addNewSection}>Add New Section</button>
                  </div>
                </div>
                <div className='row'>
                  {sections.map((section, index) => (
                    <div key={index} className="col-md-3 pb-3">
                      <input
                        type="button"
                        className={`btn btn-sm ${activeSection === index ? 'btn-success' : ''}`}
                        onClick={() => handleSectionClick(index)} value={section}
                      />
                        
                      
                    </div>
                  ))}
                </div>
                {activeSection !== null && (
                  <div className='p-4 border' style={{backgroundColor:"#9da2a7"}}>
                  <div className="row  ">
                    <div className="col-md-6 mb-2">
                    <label  className="form-label">No of Question</label>
                        <input type="text" className={`form-control no_ques_${activeSection+1}`} value={formData.sectionData[activeSection]?.noQuestion || ''} onChange={(e) => handleSectionDataChange(activeSection, 'noQuestion', e.target.value)} placeholder={`Input for ${sections[activeSection]}`} />
                    </div>
                    <div className="col-md-6 mb-2">
                    <label htmlFor="totalquestion" className="form-label">Maximum Answer</label>
                      <input type="text" className={`form-control max_ans_${activeSection+1}`} value={formData.sectionData[activeSection]?.maxAnswer || ''} onChange={(e) => handleSectionDataChange(activeSection, 'maxAnswer', e.target.value)} placeholder={`Input for ${sections[activeSection]}`} />
                    </div>
                    <div className="col-md-6 mb-2">
                    <label htmlFor="totalquestion" className="form-label">Right Mark</label>
                      <input type="text" className={`form-control right_mark_${activeSection+1}`} value={formData.sectionData[activeSection]?.rightMark || ''} onChange={(e) => handleSectionDataChange(activeSection, 'rightMark', e.target.value)} placeholder={`Input for ${sections[activeSection]}`} />
                    </div>
                    <div className="col-md-6 mb-2">
                    <label htmlFor="totalquestion" className="form-label">Nagative Mark</label>
                      <input type="text" className={`form-control wrong_mark_${activeSection+1}`} value={formData.sectionData[activeSection]?.wrongMark || ''} onChange={(e) => handleSectionDataChange(activeSection, 'wrongMark', e.target.value)} placeholder={`Input for ${sections[activeSection]}`} />
                    </div>

                  </div>
                  <div className="btn btn-sm btn-secondary mt-2" onClick={() => removeSection(activeSection)}>remove</div>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onClick={handleSubmit} className="btn btn-sm btn-success">
              Submit
            </button>
            <button type="button" onClick={onClose} className="mr-3 btn btn-sm ">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExamModal;
