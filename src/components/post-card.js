import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ id, title, excerpt, date, category, image }) {
  return (
    <Link 
      to={`/post/${id}`} 
      className="block bg-gray-100 rounded-lg overflow-hidden mb-6 hover:shadow-md transition-shadow duration-300 ring-0 hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{date}</span>
          <span>{category}</span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
