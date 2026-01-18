import React from "react";
import { useRM } from "../context/RMContext";

const Reports = () => {
  const { customers } = useRM();

  const reportCounts = customers.reduce((acc, c) => {
    if (c.status?.toLowerCase().includes("report")) {
      acc += 1;
    }
    return acc;
  }, 0);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Reports</h2>
      <div className="bg-gray-800 bg-opacity-30 backdrop-blur-md p-8 rounded-2xl shadow-xl text-white">
        <h3 className="text-xl mb-4">Total Reports Created: {reportCounts}</h3>
        {/* Here you can add more line-item report generation UI */}
      </div>
    </div>
  );
};

export default Reports;
