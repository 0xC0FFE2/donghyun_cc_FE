import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';

function RecentPosts({ size }) {
  const [recents, setRecents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecentPosts();
  }, [size]);

  const fetchRecentPosts = async () => {
    try {
      const response = await fetch(`http://localhost:5500/articles?size=${size}&page=1`);
      if (!response.ok) {
        throw new Error('Failed to fetch recent posts');
      }
      const data = await response.json();
      setRecents(data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
