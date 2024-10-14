import React from 'react';

const LoadingFailSpinner = ({ message = '알 수 없는 문제가 발생했어요' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 bg-red-500 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <p className="text-lg font-medium text-red-600 mb-4">{message}</p>
    </div>
  );
};

export default LoadingFailSpinner;