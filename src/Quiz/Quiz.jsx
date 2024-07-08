import React, { useState } from 'react';
import './Quiz.css';
import quizData from './question'; // Importing quiz data from question.js

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswered, setUserAnswered] = useState(false);
  const [userChoice, setUserChoice] = useState(null);

  const handleAnswerClick = (correct) => {
    if (!userAnswered) {
      setUserAnswered(true);
      setUserChoice(correct);
      if (correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswered(false);
      setUserChoice(null);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setUserAnswered(false);
    setUserChoice(null);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} out of {quizData.length}</h2>
          <button className="restart-button" onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{quizData.length}
            </div>
            <div className="question-text">{quizData[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {quizData[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                className={`answer-button ${userAnswered && (answer.correct ? 'correct' : (userChoice === answer.correct ? 'incorrect' : ''))}`}
                onClick={() => handleAnswerClick(answer.correct)}
                disabled={userAnswered}
              >
                {answer.text}
              </button>
            ))}
            {userAnswered && (
              <button className="next-button" onClick={handleNextQuestion}>Next</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
