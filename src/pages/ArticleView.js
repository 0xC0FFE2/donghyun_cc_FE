import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MDViewer from '../components/MDviewer';
import RecentPosts from '../components/RecentPosts';

const ArticleView = () => {
  const { id: articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState('');
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5500/articles/${articleId}`);
        const data = await response.json();
        setArticle(data);

        const contentResponse = await fetch(data.article_data_url);
        const contentData = await contentResponse.text();
        setContent(contentData);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    const fetchRecentArticles = async () => {
      try {
        const response = await fetch('http://localhost:5500/articles?size=4');
        const data = await response.json();
        setRecentArticles(data.articles);
      } catch (error) {
        console.error('Error fetching recent articles:', error);
      }
    };

    fetchArticle();
    fetchRecentArticles();
  }, [articleId]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12 pt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{article.article_name}</h1>
        <div className="mb-8">
          <span className="text-gray-600">
            {new Date(article.article_date).toLocaleDateString('ko-KR')}
          </span>
          {article.categorys.map((category) => (
            <span key={category.category_id} className="ml-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {category.category_name}
            </span>
          ))}
        </div>
        <img src={article.thumbnail_url} alt={article.article_name} className="w-full max-h-96 object-cover mb-8" />
        <MDViewer content={content} />
      </div>
      <RecentPosts recents={recentArticles} />
    </div>
  );
};

export default ArticleView;