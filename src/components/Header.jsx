import React, { useState, useEffect } from 'react';

const Header = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-blue-900 text-white shadow-md">
      <div className="text-xl font-bold tracking-wide">
        CUET (UG) 2026 Mock Examination Portal
      </div>

      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-200">Time Left</span>
        <span className="text-2xl font-mono bg-blue-950 px-4 py-1 rounded-md shadow-inner">
          {formatTime(timeLeft)}
        </span>
      </div>

      <button
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow transition-colors"
        onClick={() => alert("Exam Submitted!")}
      >
        Submit Exam
      </button>
    </header>
  );
};

export default Header;
