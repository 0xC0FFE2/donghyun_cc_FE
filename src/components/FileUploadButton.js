import React from 'react';

const SubmitButton = ({ uploading }) => {
    return (
        <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
            {uploading ? '업로드 중...' : '파일 업로드'}
        </button>
    );
};

export default SubmitButton;
