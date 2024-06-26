import create from 'zustand';

// Helper function to safely access local storage
const getStoredState = (key) => {
  const storedState = localStorage.getItem(key);
  return storedState ? JSON.parse(storedState) : null;
};

// Create a Zustand store with persistence
const useExamStore = create((set) => ({
  selectedExam: getStoredState('selectedExam'), // Initialize with data from local storage
  setExam: (exam) => {
    localStorage.setItem('selectedExam', JSON.stringify(exam)); // Store the exam in local storage
    set({ selectedExam: exam });
  },
}));

export default useExamStore;

// import create from 'zustand';

// const useExamStore = create((set) => ({
//   selectedExam: null, // initially, no exam is selected
//   setExam: (exam) => set({ selectedExam: exam }), // function to set the selected exam
// }));

// export default useExamStore;
