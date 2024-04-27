import create from 'zustand';
import { persist } from 'zustand/middleware';

// Create a global store using Zustand with persistence
const useExamStore = create(
  persist(
    (set) => ({
      answeredQuestions: [], // List of answered questions
      unansweredQuestions: [], // List of unanswered questions
      // Function to add answered questions
      addAnsweredQuestion: (index) => {
        set((state) => {
          if (!state.answeredQuestions.includes(index)) {
            return { answeredQuestions: [...state.answeredQuestions, index] };
          }
          return state;
        });
      },
      // Function to add unanswered questions
      addUnansweredQuestion: (index) => {
        set((state) => {
          if (!state.unansweredQuestions.includes(index)) {
            return { unansweredQuestions: [...state.unansweredQuestions, index] };
          }
          return state;
        });
      },
      // Function to remove answered questions
      removeAnsweredQuestion: (index) => {
        set((state) => {
          const updatedAnswers = state.answeredQuestions.filter((i) => i !== index);
          return { answeredQuestions: updatedAnswers };
        });
      },
    }),
    {
      name: 'exam-questions-state', // Storage name
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default useExamStore;
