import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import Questions from "./Questions.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((answer) => {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  if (isQuizComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Questions
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelect={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
