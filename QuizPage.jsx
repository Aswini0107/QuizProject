import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuizContext } from "./QuizContext";
import axios from 'axios';
import "tailwindcss/tailwind.css";


const QuizPage = () => {
  const { category } = useParams();
  const { score, setScore, timeLeft, setTimeLeft } = useContext(QuizContext);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    // Mock questions or fetch from API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/questions?category=${category}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions", error);
        setQuestions([
          {
            question: "What is 2+2?",
            options: ["3", "4", "5", "6"],
            answer: "4",
          },
          {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris",
          },
        ]); // fallback
      }
    };

    fetchQuestions();

    // Initialize timer
    setTimeLeft(300); // 5 minutes
  }, [category, setTimeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [setTimeLeft]);

  const handleNext = () => {
    if (questions[currentQuestion].answer === selectedAnswer) {
      setScore((prev) => prev + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleSubmit = () => {

    navigate("/leaderboard", { state: { score } });
  };

  if (!questions.length) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="text-right">Time Left: {timeLeft}s</div>
      <h1 className="text-xl font-bold">{questions[currentQuestion].question}</h1>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {questions[currentQuestion].options.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedAnswer(option)}
            className={`p-2 border rounded-md ${
              selectedAnswer === option ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNext} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        )}
      </div>
      
    </div>
  );
};

export default QuizPage;