import Answers from "./Answers";
import QuizTimer from "./QuizTimer";
import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Questions({ index, onSelect, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => onSelect(answer), 2000);
    }, 1000);
  };

  let answerCssStatus = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerCssStatus = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerCssStatus = "answered";
  }

  return (
    <div id="questions">
      <QuizTimer
        key={timer}
        timeOut={timer}
        onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerCssStatus}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerCssStatus}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
