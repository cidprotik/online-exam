import create from 'zustand';
import { persist } from 'zustand/middleware';

// Create a global store using Zustand with persistence
const useAnswerStore = create(
  persist(
    (set) => ({
      answeredQuestions: [], // List of answered questions
      unansweredQuestions: [], // List of unanswered questions
      addAnsweredQuestion: (index) => {
        set((state) => {
          if (!state.answeredQuestions.includes(index)) {
            return { answeredQuestions: [...state.answeredQuestions, index] };
          }
          return state;
        });
      },
      addUnansweredQuestion: (index) => {
        set((state) => {
          if (!state.unansweredQuestions.includes(index)) {
            return { unansweredQuestions: [...state.unansweredQuestions, index] };
          }
          return state;
        });
      },
      // Functions to set state directly (if needed)
      setAnsweredQuestions: (questions) => {
        set({ answeredQuestions: questions });
      },
      setUnansweredQuestions: (questions) => {
        set({ unansweredQuestions: questions });
      },
    }),
    {
      name: 'exam-progress', // Name for persistence in localStorage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default useAnswerStore;
