import React from 'react';

const Loader = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-t-blue-500 border-r-blue-500 border-b-blue-200 border-l-blue-200 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Loader size="lg" />
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  );
}