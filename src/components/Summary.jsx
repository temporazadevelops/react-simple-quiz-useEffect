import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0],
  );

  const skippedAnswerPercentage = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100,
  );
  const correctAnswerPercentage = Math.round(
    (correctAnswers.length / userAnswers.length) * 100,
  );
  const wrongAnswerPecentage =
    100 - correctAnswerPercentage - skippedAnswerPercentage;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy Icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswerPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswerPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswerPecentage}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>

      <ol>
        {userAnswers.map((answer, index) => {
          let userAnswerStatusCss = "user-answer ";

          if (answer === null) {
            userAnswerStatusCss += "skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            userAnswerStatusCss += "correct";
          } else {
            userAnswerStatusCss += "wrong";
          }

          return (
            <li key={index}>
              <h2>{index + 1}</h2>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={userAnswerStatusCss}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
