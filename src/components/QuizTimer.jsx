import { useState, useEffect } from "react";

export default function QuizTimer({ timeOut, onTimeOut, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeOut);
  useEffect(() => {
    const timer = setTimeout(onTimeOut, timeOut);
    return () => clearTimeout(timer);
  }, [timeOut, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="question">
      <progress
        id="progress"
        max={timeOut}
        value={remainingTime}
        className={mode}
      />
    </div>
  );
}
