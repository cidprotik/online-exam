// hooks/useAggregateAnsweredData.js
import { useSectionStore } from "../zustand/useAnswerStore";
import { useEffect, useState } from "react";

const useAggregateAnsweredData = (sectionNames) => {
    console.log("first: " + sectionNames)
  const [aggregatedData, setAggregatedData] = useState({
    answeredQuestions: [],
    unansweredQuestions: [],
    markedForReview: [],
  });

  useEffect(() => {
    const fetchAllData = () => {
      const allAnsweredQuestions = [];
      const allUnansweredQuestions = [];
      const allMarkedForReview = [];

      sectionNames.forEach((sectionName) => {
        const store = useSectionStore(sectionName);
        const { answeredQuestions, unansweredQuestions, markedForReview } = store();
        console.log("firstttt: " + answeredQuestions)
        allAnsweredQuestions.push(...answeredQuestions);
        allUnansweredQuestions.push(...unansweredQuestions);
        allMarkedForReview.push(...markedForReview);
      });

      setAggregatedData({
        answeredQuestions: [...new Set(allAnsweredQuestions)],
        unansweredQuestions: [...new Set(allUnansweredQuestions)],
        markedForReview: [...new Set(allMarkedForReview)],
      });
    };

    fetchAllData();
  }, [sectionNames]);

  return aggregatedData;
};

export default useAggregateAnsweredData;
