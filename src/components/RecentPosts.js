import React from 'react';
import PostCard from './Post-card';

function RecentPosts({ recents }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">최근 게시물</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recents.map(post => (
          <PostCard key={post.id} {...post} image={`https://th.bing.com/th/id/OIG2.9O4YqGf98tiYzjKDvg7L?${post.title}`} />
        ))}
      </div>
    </div>
  );
}

export default RecentPosts;
