import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { QuizContextProvider, QuizContext } from "./QuizContext";
import QuizPage from "./QuizPage";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import "tailwindcss/tailwind.css";

const App = () => {
  return (
    <QuizContextProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 p-4" >
          <nav className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-md">
            <Link to="/" className="text-lg font-bold">Quiz Dashboard</Link>
            <Link to="/leaderboard" className="text-sm">Leaderboard</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quiz/:category" element={<QuizPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </Router>
    </QuizContextProvider>
  );
};

export default App;