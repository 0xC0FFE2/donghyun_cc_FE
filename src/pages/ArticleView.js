import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MDViewer from '../components/MDviewer';
import RecentPosts from '../components/RecentPosts';
import LoadingSpinner from '../components/LoadingIcon';
import { API_BASE_URL } from '../__CONF__';

const ArticleView = () => {
  const { id: articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState('');
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_BASE_URL+`/articles/${articleId}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('게시물을 찾을 수 없습니다.');
          }
          throw new Error('서버 오류가 발생했습니다.');
        }
        const data = await response.json();
        setArticle(data);

        const contentResponse = await fetch(data.article_data_url);
        if (!contentResponse.ok) {
          throw new Error('게시물 내용을 가져오는 데 실패했습니다.');
        }
        const contentData = await contentResponse.text();
        setContent(contentData);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, navigate]);

  if (loading) return <LoadingSpinner />

  if (error) return (
    <div className="container mx-auto px-4 py-12 pt-20">
      <div className="text-red-600 text-center mb-8">{error}</div>
      <ToastContainer />
    </div>
  );

  if (!article) return null;

  return (
    <div className="container mx-auto px-4 py-12 pt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{article.article_name}</h1>
        <div className="mb-8">
          <span className="text-gray-600">
            {new Date(article.article_date).toLocaleDateString('ko-KR')}
          </span>
          {Array.isArray(article.categorys) && article.categorys.length > 0 ? (
            article.categorys.map((category) => (
              <span key={category.category_id} className="ml-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {category.category_name}
              </span>
            ))
          ) : (
            <span className="ml-2 text-gray-500">카테고리가 없습니다.</span>
          )}
        </div>
        {article.thumbnail_url && (
          <img src={article.thumbnail_url} alt={article.article_name} className="w-full max-h-96 object-cover mb-8" />
        )}
        <MDViewer content={content} />
      </div>
      <RecentPosts size='4' />
      <ToastContainer />
    </div>
  );
};

export default ArticleView;