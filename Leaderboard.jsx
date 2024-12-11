import React from "react";
import { useLocation } from "react-router-dom";

const Leaderboard = () => {
  const location = useLocation();
  const { state } = location;
  const { score } = state;

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold">Leaderboard</h1>
      <p>Your score: {score}</p>
    </div>
  );
};

export default Leaderboard;
