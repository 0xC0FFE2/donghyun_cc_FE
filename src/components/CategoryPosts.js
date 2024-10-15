import React, { useState, useRef, useEffect } from 'react';
import PostCard from './PostCard';
import LoadingSpinner from './LoadingIcon';
import { API_BASE_URL } from '../__CONF__';
import LoadingFailSpinner from './ErrorIcon';

function CategoryPosts({ size, mode }) {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(['전체']);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const categoryRef = useRef(null);

  const defaultCategories = ['전체', '소프트웨어 개발 개념', '백엔드', '프론트엔드', 'CI/CD'];

  useEffect(() => {
    if (mode === "FULL") {
      fetchCategories();
    } else {
      setCategories(defaultCategories);
    }
    fetchPosts();
  }, [selectedCategory, currentPage, mode]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_BASE_URL + '/categories');
      const data = await response.json();
      setCategories(['전체', ...data.map(category => category.category_name)]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url;
      if (selectedCategory === '전체') {
        url = API_BASE_URL + `/articles?page=${currentPage}&size=${size}`;
      } else {
        url = API_BASE_URL + `/search/categories/${selectedCategory}?page=${currentPage}&size=${size}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data.articles);
      setTotalPages(data.totalPage);
    } catch (error) {
      setError('카테고리를 불러오는 데 실패했습니다.');
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory !== '전체' && categoryRef.current) {
      const selectedButton = categoryRef.current.querySelector(`[data-category="${selectedCategory}"]`);
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <LoadingFailSpinner message='서버 통신 문제가 발생했어요' />;

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
              onClick={() => handleCategoryChange(category)}
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

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map(post => (
            <PostCard
              key={post.article_id}
              id={post.article_id}
              title={post.article_name}
              date={new Date(post.article_date).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}
              category={post.categories[0] || '미분류'}
              image={post.thumbnail_url}
            />
          ))}
        </div>
      )}

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