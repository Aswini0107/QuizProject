import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "tailwindcss/tailwind.css";


const Dashboard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch quiz categories from API or define locally
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
        setCategories(["Math", "Logical Reasoning", "Verbal Ability"]); // fallback
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {categories.map((category) => (
        <Link to={`/quiz/${category}`} key={category} className="p-4 bg-white shadow-md rounded-md text-center">
          {category}
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;
