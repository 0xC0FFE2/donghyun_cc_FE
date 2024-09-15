import React from 'react';
import Header from '../components/header';
import ProfileCard from '../components/profile-card';
import PostCard from '../components/post-card';
import Footer from '../components/footer';

const PortfolioPage = () => {
  const posts = [
    { title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { title: 'nodeJS AWS와 연결하기', date: '24.09.22', category: '백엔드' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <ProfileCard />
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="p-4">
              <p className="text-sm text-gray-500 text-center">
                세상에 조금이라도 도음이 되는 개발자를 꿈꾸는 개발자 이동현 입니다!
              </p>
            </div>
          </div>
          <h2 className="text-lg font-semibold mb-4">최근 게시물</h2>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <PostCard key={index} title={post.title} date={post.date} category={post.category} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
