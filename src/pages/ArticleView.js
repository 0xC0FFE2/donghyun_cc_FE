import React, { useState, useEffect } from 'react';
import MDViewer from '../components/MDviewer';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`http://localhost:5500/articles?size=4&page=${currentPage}`);
        const data = await response.json();
        setArticles(data.articles);
        setTotalPages(data.totalPage);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">게시글 목록</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <div key={article.article_id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={article.thumbnail_url} alt={article.article_name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.article_name}</h2>
              <p className="text-gray-600 text-sm">
                {new Date(article.article_date).toLocaleDateString('ko-KR')}
              </p>
              <a
                href={`/articles/${article.article_id}`}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                자세히 보기
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

const ArticleDetail = ({ articleId }) => {
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5500/articles/${articleId}`);
        const data = await response.json();
        setArticle(data);

        // 게시글 내용 가져오기
        const contentResponse = await fetch(data.article_data_url);
        const contentData = await contentResponse.text();
        setContent(contentData);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{article.article_name}</h1>
      <p className="text-gray-600 mb-4">
        {new Date(article.article_date).toLocaleDateString('ko-KR')}
      </p>
      <img src={article.thumbnail_url} alt={article.article_name} className="w-full max-h-96 object-cover mb-8" />
      <MDViewer content={content} />
    </div>
  );
};

export { ArticleList, ArticleDetail };