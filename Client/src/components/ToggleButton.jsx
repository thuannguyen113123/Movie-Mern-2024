import React from "react";

const ToggleButton = ({ selected, onCategoryChange, categories }) => {
  const handleClick = (categoryIndex) => {
    if (selected === categoryIndex) return;
    onCategoryChange(categoryIndex);
  };

  return (
    <div className="relative bg-white dark:bg-black flex gap-2 px-2 py-2 rounded-full w-[200px]">
      {/* Thanh trượt */}
      <div
        className={`absolute top-0 bottom-0 left-0 h-full w-1/2 bg-gray-200 shadow-lg dark:bg-gray-800 rounded-full transition-transform duration-300 ease-in-out ${
          selected === 0 ? "translate-x-0" : "translate-x-full"
        }`}
      ></div>
      {/* Lựa chọn */}
      {categories.map((category, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          className={`z-10 cursor-pointer flex-1 text-center px-3 rounded-full transition-colors duration-300 ease-in-out text-[14px] ${
            selected === index
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {category}
        </span>
      ))}
    </div>
  );
};

export default ToggleButton;
