import create from 'zustand';
import { persist } from 'zustand/middleware';

// Define the store with persistence
const createSectionStore = (sectionName) => create(
  persist(
    (set, get) => ({
      answeredQuestions: [], // List of answered questions
      unansweredQuestions: [], // List of unanswered questions
      selectedOptions: {}, // Dictionary of selected options for each question
      markedForReview: [],
      addAnsweredQuestion: (index) => {
        set((state) => {
          const updatedUnanswered = state.unansweredQuestions.filter((i) => i !== index);
          if (!state.answeredQuestions.includes(index)) {
            return {
              answeredQuestions: [...state.answeredQuestions, index],
              unansweredQuestions: updatedUnanswered,
            };
          }
          return { unansweredQuestions: updatedUnanswered };
        });
      },
      addUnansweredQuestion: (index) => {
        set((state) => {
          const updatedAnswered = state.answeredQuestions.filter((i) => i !== index);
          if (!state.unansweredQuestions.includes(index)) {
            return {
              unansweredQuestions: [...state.unansweredQuestions, index],
              answeredQuestions: updatedAnswered,
            };
          }
          return { answeredQuestions: updatedAnswered };
        });
      },
      setSelectedOption: (index, option) => {
        set((state) => {
          // Ensure selectedOptions is defined before updating
          if (!state.selectedOptions) {
            state.selectedOptions = {}; // Initialize if undefined
          }
          const newSelectedOptions = { ...state.selectedOptions, [index]: option };
          return { selectedOptions: newSelectedOptions };
        });
      },
      getSelectedOption: (index) => {
        const state = get();
        return state.selectedOptions ? state.selectedOptions[index] : null;
      },
      clearSelectedOption: (index) => {
        set((state) => {
          const { [index]: _, ...newSelectedOptions } = state.selectedOptions; // Removing the specified index
          return { selectedOptions: newSelectedOptions };
        });
      },
      removeAnsweredQuestion: (index) => {
        set((state) => {
          const updatedAnswers = state.answeredQuestions.filter((i) => i !== index);
          return { answeredQuestions: updatedAnswers };
        });
      },
      removeUnansweredQuestion: (index) => {
        set((state) => {
          const updatedUnanswered = state.unansweredQuestions.filter((i) => i !== index);
          return { unansweredQuestions: updatedUnanswered };
        });
      },
      setAnsweredQuestions: (questions) => {
        set({ answeredQuestions: questions });
      },
      setUnansweredQuestions: (questions) => {
        set({ unansweredQuestions: questions });
      },
      fetchSelectedOptions: (selectedOptions) => {
        set((state) => {
          // Copy the existing state and update it with the new selectedOptions
          return { selectedOptions: { ...state.selectedOptions, ...selectedOptions } };
        });
      },
      addMarkedForReview: (index) => {
        set((state) => {
          if (!state.markedForReview.includes(index)) {
            return { markedForReview: [...state.markedForReview, index] };
          }
          return state; // If already marked, do nothing
        });
      },
      // Setter for markedForReview state
      setMarkedForReview: (questions) => {
        set({ markedForReview: questions });
      },
      // Method to remove a question index from marked for review
      removeMarkedForReview: (index) => {
        set((state) => {
          const updatedMarkedForReview = state.markedForReview.filter((i) => i !== index);
          return { markedForReview: updatedMarkedForReview };
        });
      },
      // Method to check if a question is marked for review
      isMarkedForReview: (index) => {
        return get().markedForReview.includes(index);
      },
    }),
    {
      name: `${sectionName}-progress`,
      getStorage: () => localStorage,
    }
  )
);

const storeCache = {};

export const useSectionStore = (sectionName) => {
  if (!storeCache[sectionName]) {
    storeCache[sectionName] = createSectionStore(sectionName);
  }
  return storeCache[sectionName];
};
