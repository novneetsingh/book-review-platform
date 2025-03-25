import React from "react";

/**
 * A simple spinning loader component that can be used throughout the application
 * @param {string} size - The size of the loader ('sm', 'md', 'lg')
 * @param {string} className - Additional CSS classes
 */
const Loader = ({ size = "md", className = "" }) => {
  // Size mapping
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`flex items-center justify-center min-h-[100px] w-full ${className}`}
    >
      <div
        className={`animate-spin rounded-full ${spinnerSize} border-4 border-gray-200 border-t-blue-500`}
      ></div>
    </div>
  );
};

export default Loader;
