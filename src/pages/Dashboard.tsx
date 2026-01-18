import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const cards = [
    { title: "Customers", link: "/customers", color: "from-green-500 to-teal-500" },
    { title: "Reports", link: "/reports", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {cards.map((c) => (
        <Link
          key={c.title}
          to={c.link}
          className={`bg-gray-800 bg-opacity-30 backdrop-blur-md p-8 rounded-2xl shadow-xl text-white font-bold text-xl flex items-center justify-center hover:scale-105 transform transition cursor-pointer bg-gradient-to-r ${c.color}`}
        >
          {c.title}
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;
