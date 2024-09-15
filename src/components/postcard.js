import React from 'react';

const PostCard = ({ title, date, category }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{date}</span>
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
