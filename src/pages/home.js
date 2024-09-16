import React, { useState, useRef, useEffect } from 'react';
import ProfileCard from '../components/Profile-card';
import PostCard from '../components/Post-card';
import CountCard from '../components/Count-card';
import Footer from '../components/Footer'

function Profile() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categoryRef = useRef(null);

  const posts = [
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 2, title: 'React 컴포넌트 최적화하기', date: '24.09.20', category: '프론트엔드' },
    { id: 3, title: 'CI/CD 파이프라인 구축하기', date: '24.09.18', category: 'CI/CD' },
    { id: 4, title: 'Docker를 이용한 개발 환경 구축', date: '24.09.16', category: '개발 지식' },
    { id: 5, title: 'GraphQL vs REST API', date: '24.09.14', category: '백엔드' },
    { id: 6, title: 'React Native로 모바일 앱 만들기', date: '24.09.12', category: '프론트엔드' },
  ];

  const recents = [
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
  ];

  const categories = ['전체', '백엔드', '프론트엔드', 'CI/CD', '개발 지식'];

  const filteredPosts = selectedCategory === '전체'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  useEffect(() => {
    if (categoryRef.current) {
      const selectedButton = categoryRef.current.querySelector(`[data-category="${selectedCategory}"]`);
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-1 pt-12">
      <h2 className="text-2xl font-bold mt-6 mb-6">소개</h2>
      <ProfileCard />
      <CountCard count={recents.length.toString()} />
      <h2 className="text-2xl font-bold mt-6 mb-6">최근 게시물</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {recents.map(post => (
          <PostCard key={post.id} {...post} image={`https://donghyun.cc/profile.jpg?${post.title}`} />
        ))}
      </div>
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
              onClick={() => setSelectedCategory(category)}
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
        {filteredPosts.map(post => (
          <PostCard key={post.id} {...post} image={`https://donghyun.cc/profile.jpg?${post.title}`} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;