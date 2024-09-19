import React, { useState, useEffect } from 'react';
import MDViewer from '../components/MDviewer';
import Footer from '../components/Footer';
import RecentPosts from '../components/RecentPosts';

const recents = [
  { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
  { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
  { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
  { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
];

const Posts = ({ postId }) => {
  const [postContent, setPostContent] = useState('');
  const [postMeta, setPostMeta] = useState(null);

  useEffect(() => {
    const fetchMeta = async () => {
      const response = await fetch(`/dummy_meta.json?${postId}/metadata.json`);
      const data = await response.json();
      setPostMeta(data);
    };

    const fetchContent = async () => {
      const response = await fetch(`/dummy.md?${postId}/content.md`);
      const content = await response.text();
      setPostContent(content);
    };

    // Fetch metadata and content concurrently
    const fetchData = async () => {
      await Promise.all([fetchMeta(), fetchContent()]);
    };

    fetchData();
  }, [postId]);

  if (!postContent || !postMeta) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12 pt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{postMeta.title}</h1>
        <div className="mb-8">
          <span className="text-gray-600">{postMeta.date}</span>
          {postMeta.tags.map((tag, index) => (
            <span key={index} className="ml-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {tag}
            </span>
          ))}
        </div>
        <MDViewer content={postContent} />
      </div>
      <RecentPosts recents={recents} />
      <Footer />
    </div>
  );
};

export default Posts;