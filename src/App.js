import React, { useState, useEffect } from "react";
import "./App.css"; // we'll add styles here

export default function MathGame() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Generate random numbers
  const generateNumbers = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer("");
    setIsWrong(false);
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const checkAnswer = (e) => {
    e.preventDefault();
    if (parseInt(answer) === num1 + num2) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= 5) {
        setGameWon(true);
      } else {
        generateNumbers();
      }
    } else {
      setIsWrong(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setGameWon(false);
    generateNumbers();
  };

  return (
    <div className="game-container">
      {gameWon ? (
        <div className="win-message">
          <h1>🎉 Congratulations, You Win! 🎉</h1>
          <button onClick={restartGame}>Play Again</button>
        </div>
      ) : (
        <>
          <h2 className="score">Score: {score}</h2>
          <h1 className={`numbers ${isWrong ? "wrong" : ""}`}>
            {num1} + {num2} = ?
          </h1>
          <form onSubmit={checkAnswer} className="form">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              placeholder="Enter answer"
            />
            <button type="submit">Check</button>
          </form>
        </>
      )}
    </div>
  );
}
