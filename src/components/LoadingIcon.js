import React from 'react';

const LoadingSpinner = ({ size = 'md', message = '로딩 중이에요!' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20"></div>
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-blue-600">{message}</p>
    </div>
  );
};

export default LoadingSpinner;