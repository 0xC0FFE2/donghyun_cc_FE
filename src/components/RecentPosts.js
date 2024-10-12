import React from 'react';
import PostCard from './PostCard';

function RecentPosts({ recents }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">최근 게시물</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recents.map(post => (
          <PostCard 
            key={post.article_id} 
            id={post.article_id}
            title={post.article_name}
            date={new Date(post.article_date).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}
            category={post.categorys[0]?.category_name || '미분류'}
            image={post.thumbnail_url}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentPosts;
