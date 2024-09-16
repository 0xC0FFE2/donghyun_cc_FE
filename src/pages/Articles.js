import React from 'react';
import PostCard from '../components/Post-card';
import Footer from '../components/Footer'

function Profile() {
  const posts = [
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
  ];

  return (
    <div className="container mx-auto px-4 py-1 pt-12">
       <h2 className="text-2xl font-bold mt-6 mb-6">전체 게시물</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} {...post} image={`https://donghyun.cc/profile.jpg?${post.title}`} />
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Profile;