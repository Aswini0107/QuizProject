import React, { createContext, useState } from "react";
import "tailwindcss/tailwind.css";

export const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  return (
    <QuizContext.Provider value={{ score, setScore, timeLeft, setTimeLeft }}>
      {children}
    </QuizContext.Provider>
  );
};