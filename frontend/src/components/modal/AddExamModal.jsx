import React, { useState } from 'react';

const AddExamModal = ({ onClose }) => {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  const addNewSection = () => {
    setSections([...sections, `Section ${sections.length + 1}`]);
  };

  const handleSectionClick = (index) => {
    setActiveSection(index);
  };

  const removeSection = (indexToRemove) => {
    setSections(sections.filter((_, index) => index !== indexToRemove));
    setActiveSection(null); // Reset active section when removed
  };

  const handleSubmit = () => {
    // Call the onClose function to close the modal
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
                    <input type="text" className="form-control" id="examName" name="examName" />
                  </div>
                  <div className="col-md-6 pb-3">
                    <label className="form-label">Date and Time</label>
                    <input
                      type="datetime-local"
                      name="date_time"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 pb-3">
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input type="text" className="form-control" id="duration" name="duration" />
                  </div>
                  <div className="col-md-6 pb-3">
                    <label htmlFor="totalquestion" className="form-label">Total Question</label>
                    <input type="number" className="form-control" id="totalquestion" name="totalquestion" />
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
                    <label htmlFor="totalquestion" className="form-label">Total Question</label>
                      <input type="text" className="form-control" placeholder={`Input for ${sections[activeSection]}`} />
                    </div>
                    <div className="col-md-6 mb-2">
                    <label htmlFor="totalquestion" className="form-label">Maximum Answer</label>
                      <input type="text" className="form-control" placeholder={`Input for ${sections[activeSection]}`} />
                    </div>
                    <div className="col-md-6 mb-2">
                    <label htmlFor="totalquestion" className="form-label">Right Mark</label>
                      <input type="text" className="form-control" placeholder={`Input for ${sections[activeSection]}`} />
                    </div>
                    <div className="col-md-6 mb-2">
                    <label htmlFor="totalquestion" className="form-label">Nagative Mark</label>
                      <input type="text" className="form-control" placeholder={`Input for ${sections[activeSection]}`} />
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
