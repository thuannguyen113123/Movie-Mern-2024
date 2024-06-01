import React from "react";
import PropTypes from "prop-types";

const CircularRate = ({ value }) => {
  // Calculate the stroke-dasharray based on the value
  const circumference = 2 * Math.PI * 45; // 2πr where r is the radius of the circle
  const offset = circumference - (value / 10) * circumference;

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg
        className="absolute"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        <circle
          className="text-gray-300"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="text-blue-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute text-blue-500 font-bold text-lg">
        {Math.round(value * 10)}%
      </div>
    </div>
  );
};

CircularRate.propTypes = {
  value: PropTypes.number.isRequired,
};

export default CircularRate;
