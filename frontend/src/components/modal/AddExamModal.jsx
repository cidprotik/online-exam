import React, { useState } from 'react';
import {useAddExam} from '../../hooks/useExam';

const AddExamModal = ({ onClose }) => {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const { loading, addexam } = useAddExam();

  const [formData, setFormData] = useState({
    examName: '',
    date_time: '',
    duration: '',
    totalquestion: '',
    sectionData: [], // Add state to manage section data
  });

  const [errors, setErrors] = useState({});
  const [sectionErrors, setSectionErrors] = useState({});

  const addNewSection = () => {
    setSections([...sections, `Section ${sections.length + 1}`]);
    setFormData({
      ...formData,
      sectionData: [...formData.sectionData, {}], // Add a new section data object
    });

    if (errors['sectionData']) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        sectionData: undefined,
      }));
    }
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

    
    
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`${field}_${index}`];
      return newErrors;
    });

    const sectionErrorsExist = Object.keys(errors).some((errorKey) =>
      errorKey.endsWith(`_${index}`)
    );
    
    if (!sectionErrorsExist) {
      const updatedSectionErrors = { ...sectionErrors };
      delete updatedSectionErrors[index];
      setSectionErrors(updatedSectionErrors);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    // Clear the specific field error when it is changed
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateFormData = (data) => {
    const errors = {};
    if (!data.examName) errors.examName = 'Exam name is required';
    if (!data.date_time) errors.date_time = 'Date and time are required';
    if (!data.duration) errors.duration = 'Duration is required';
    if (!data.totalquestion) errors.totalquestion = 'Total question is required';

    data.sectionData.forEach((section, index) => {
     if (!section.noQuestion) {
        errors[`noQuestion_${index}`] = 'Number of questions is required';
        setSectionErrors((prevErrors) => ({ ...prevErrors, [index]: true }));
      } else {
        setSectionErrors((prevErrors) => ({ ...prevErrors, [index]: false }));
      }
      if (!section.maxAnswer) {
        errors[`maxAnswer_${index}`] = 'Maximum answer is required';
        setSectionErrors((prevErrors) => ({ ...prevErrors, [index]: true }));
      } else {
        setSectionErrors((prevErrors) => ({ ...prevErrors, [index]: false }));
      }
      if (!section.rightMark) {
        errors[`rightMark_${index}`] = 'Right mark is required';
        setSectionErrors((prevErrors) => ({ ...prevErrors, [index]: true }));
      } else {
        setSectionErrors((prevErrors) => ({ ...prevErrors, [index]: false }));
      }
      if (!section.wrongMark) {
        errors[`wrongMark_${index}`] = 'Wrong mark is required';
        setSectionErrors((prevErrors) => ({ ...prevErrors, [index]: true }));
      } else {
        setSectionErrors((prevErrors) => ({ ...prevErrors, [index]: false }));
      }
    });

    return errors;
  };


  const handleSubmit =  async (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    console.log("first", validationErrors)
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && formData.sectionData.length > 0) {
      await addexam(formData);
      onClose();
    } else if (formData.sectionData.length === 0) {
      // If no section is added, set an error indicating that at least one section is required
      setErrors((prevErrors) => ({
        ...prevErrors,
        sectionData: "At least one section is required",
      }));
    }

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
                    <label htmlFor="examName" className={`form-label ${errors.examName? 'text-danger' : ''}`}>Exam Name</label>
                    <input type="text" className={`form-control ${errors.examName? 'is-invalid' : ''}`} id="examName" name="examName" value={formData.examName} onChange={(e) => handleFormChange('examName', e.target.value)} />
                    {errors.examName && <span className="text-danger">{errors.examName}</span>}
                  </div>
                  <div className="col-md-6 pb-3">
                    <label className={`form-label ${errors.date_time? 'text-danger' : ''}`}>Date and Time</label>
                    <input
                      type="datetime-local"
                      name="date_time"
                      className={`form-control ${errors.date_time? 'is-invalid' : ''}`}
                      onChange={(e) => handleFormChange('date_time', e.target.value)}
                    />
                    {errors.date_time && <span className="text-danger">{errors.date_time}</span>}
                  </div>
                  <div className="col-md-6 pb-3">
                    <label htmlFor="duration" className={`form-label ${errors.duration? 'text-danger' : ''}`}>Duration</label>
                    <input type="text" className={`form-control ${errors.duration? 'is-invalid' : ''}`} id="duration" name="duration" onChange={(e) => handleFormChange('duration', e.target.value)}/>
                    {errors.duration && <span className="text-danger">{errors.duration}</span>}
                  </div>
                  <div className="col-md-6 pb-3">
                    <label htmlFor="totalquestion" className={`form-label ${errors.totalquestion? 'text-danger' : ''}`}>Total Question</label>
                    <input type="number" className={`form-control ${errors.totalquestion? 'is-invalid' : ''}`} id="totalquestion" name="totalquestion" onChange={(e) => handleFormChange('totalquestion', e.target.value)}/>
                    {errors.totalquestion && <span className="text-danger">{errors.totalquestion}</span>}
                  </div>
                  <div className="col-md-6 pb-3">
                    <button type="button" className="btn btn-sm btn-primary" onClick={addNewSection}>Add New Section</button>
                    {errors['sectionData'] && <span className="text-danger">{errors['sectionData']}</span>}
                  </div>
                </div>
                <div className='row'>
                  {sections.map((section, index) => (
                    <div key={index} className="col-md-3 pb-3">
                      <input
                        type="button"
                        className={`btn btn-sm ${activeSection === index ? 'btn-success' : ''} ${sectionErrors[index] ? 'btn-blink' : ''}`}
                        onClick={() => handleSectionClick(index)} value={section}
                      />
                        
                      
                    </div>
                  ))}
                </div>
                {activeSection !== null && (
                  <div className='p-4 border' style={{backgroundColor:"#9da2a7"}}>
                  <div className="row  ">
                    <div className="col-md-6 mb-2">
                    <label  className={`form-label ${errors[`noQuestion_${activeSection}`]? 'text-danger' : ''}`}>No of Question</label>
                        <input type="number" className={`form-control no_ques_${activeSection+1} ${errors[`noQuestion_${activeSection}`]? 'is-invalid' : ''}`} value={formData.sectionData[activeSection]?.noQuestion || ''} onChange={(e) => handleSectionDataChange(activeSection, 'noQuestion', e.target.value)} placeholder={`Input for ${sections[activeSection]}`} />
                        {errors[`noQuestion_${activeSection}`] && <span className="text-danger">{errors[`noQuestion_${activeSection}`]}</span>}
                    </div>
                    <div className="col-md-6 mb-2">
                    <label className={`form-label ${errors[`maxAnswer_${activeSection}`]? 'text-danger' : ''}`}>Maximum Answer</label>
                      <input type="number" className={`form-control max_ans_${activeSection+1} ${errors[`maxAnswer_${activeSection}`]? 'is-invalid' : ''}`} value={formData.sectionData[activeSection]?.maxAnswer || ''} onChange={(e) => handleSectionDataChange(activeSection, 'maxAnswer', e.target.value)} placeholder={`Input for ${sections[activeSection]}`} />
                      {errors[`maxAnswer_${activeSection}`] && <span className="text-danger">{errors[`maxAnswer_${activeSection}`]}</span>}
                    </div>
                    <div className="col-md-6 mb-2">
                    <label className={`form-label ${errors[`rightMark_${activeSection}`]? 'text-danger' : ''}`}>Right Mark</label>
                      <input type="number" className={`form-control right_mark_${activeSection+1} ${errors[`rightMark_${activeSection}`]? 'is-invalid' : ''}`} value={formData.sectionData[activeSection]?.rightMark || ''} onChange={(e) => handleSectionDataChange(activeSection, 'rightMark', e.target.value)} placeholder={`Input for ${sections[activeSection]}`} />
                      {errors[`rightMark_${activeSection}`] && <span className="text-danger">{errors[`rightMark_${activeSection}`]}</span>}
                    </div>
                    <div className="col-md-6 mb-2">
                    <label className={`form-label ${errors[`wrongMark_${activeSection}`]? 'text-danger' : ''}`}>Nagative Mark</label>
                      <input type="number" className={`form-control wrong_mark_${activeSection+1} ${errors[`wrongMark_${activeSection}`]? 'is-invalid' : ''}`} value={formData.sectionData[activeSection]?.wrongMark || ''} onChange={(e) => handleSectionDataChange(activeSection, 'wrongMark', e.target.value)} placeholder={`Input for ${sections[activeSection]}`} />
                      {errors[`wrongMark_${activeSection}`] && <span className="text-danger">{errors[`wrongMark_${activeSection}`]}</span>}
                    </div>

                  </div>
                  <div className="btn btn-sm btn-secondary mt-2" onClick={() => removeSection(activeSection)}>remove</div>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onClick={handleSubmit} className="btn btn-sm btn-success" disabled={loading}>
            {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <span>Submit</span>
                    )}
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
