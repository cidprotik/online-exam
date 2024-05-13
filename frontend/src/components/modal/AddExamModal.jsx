import React from 'react';

const AddExamModal = ({ onClose }) => {

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
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="sm:flex sm:items-center sm:justify-center">
  <div className="mt-3 sm:mt-0 sm:text-center">
    <h3 className="text-lg font-medium text-gray-900">Add New Exam</h3>
    <div className="mt-2">
      <p className="text-sm text-gray-500">
        {/* Your modal content goes here */}
        Example content for the modal.
      </p>
    </div>
  </div>
</div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onClick={handleSubmit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
              Submit
            </button>
            <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExamModal;
