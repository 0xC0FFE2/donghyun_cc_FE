import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import CountCard from '../components/Count-card';
import RecentPosts from '../components/RecentPosts';
import CategoryPosts from '../components/CategoryPosts';

function Profile() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5500/articles?size=8&page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data.articles);
      setTotalPages(data.totalPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const recents = posts.slice(0, 4);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-1 pt-12">
      <h2 className="text-2xl font-bold mt-6 mb-6">소개</h2>
      <ProfileCard />
      <CountCard count={posts.length.toString()} />
      <RecentPosts recents={recents} />
      <CategoryPosts
        posts={posts}
        viewPage={currentPage.toString()}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Profile;