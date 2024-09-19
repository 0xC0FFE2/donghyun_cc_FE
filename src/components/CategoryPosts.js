import React, { useState, useRef, useEffect } from 'react';
import PostCard from './Post-card';

function CategoryPosts({ posts, viewPage }) {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const categoryRef = useRef(null);

  const categories = ['전체', '백엔드', '프론트엔드', 'CI/CD', '개발 지식'];

  const filteredPosts = selectedCategory === '전체'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const postsPerPage = viewPage;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  useEffect(() => {
    if (selectedCategory !== '전체' && categoryRef.current) {
      const selectedButton = categoryRef.current.querySelector(`[data-category="${selectedCategory}"]`);
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedCategory]);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">카테고리별 게시물</h2>
      <div className="relative mb-6">
        <div
          ref={categoryRef}
          className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {categories.map(category => (
            <button
              key={category}
              data-category={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1); // Reset to the first page when category changes
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedPosts.map(post => (
          <PostCard key={post.id} {...post} image={`https://nanu.cc/assets/cdn.png?${post.title}`} />
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 mb-8 ${currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryPosts;
