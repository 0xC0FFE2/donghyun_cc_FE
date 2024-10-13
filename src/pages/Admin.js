import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../__CONF__';

const AdminArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(API_BASE_URL+`/admin/articles?page=${currentPage}&size=8`);
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      toast.error('Failed to fetch articles');
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(API_BASE_URL+`/admin/articles/${selectedArticle.article_id}`, {
        article_name: selectedArticle.article_name,
        thumbnail_url: selectedArticle.thumbnail_url,
        article_data_url: selectedArticle.article_data_url,
        article_view_mode: selectedArticle.article_view_mode,
        categories: selectedArticle.categorys.map(cat => cat.category_id)
      });
      toast.success('Article updated successfully');
      setSelectedArticle(null);
      fetchArticles();
    } catch (error) {
      toast.error('Failed to update article');
    }
  };

  const handleDelete = async (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axios.delete(API_BASE_URL+`/admin/articles/${articleId}`);
        toast.success('Article deleted successfully');
        fetchArticles();
      } catch (error) {
        toast.error('Failed to delete article');
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">게시글 관리</h1>
      
      {selectedArticle && (
        <div className="bg-gray-100 p-4 mb-4 rounded">
          <h2 className="text-xl font-bold mb-2">Edit Article</h2>
          <input
            className="w-full p-2 mb-2 border rounded"
            value={selectedArticle.article_name}
            onChange={(e) => setSelectedArticle({...selectedArticle, article_name: e.target.value})}
            placeholder="Article Name"
          />
          <input
            className="w-full p-2 mb-2 border rounded"
            value={selectedArticle.thumbnail_url}
            onChange={(e) => setSelectedArticle({...selectedArticle, thumbnail_url: e.target.value})}
            placeholder="Thumbnail URL"
          />
          <input
            className="w-full p-2 mb-2 border rounded"
            value={selectedArticle.article_data_url}
            onChange={(e) => setSelectedArticle({...selectedArticle, article_data_url: e.target.value})}
            placeholder="Article Data URL"
          />
          <select
            className="w-full p-2 mb-2 border rounded"
            value={selectedArticle.article_view_mode}
            onChange={(e) => setSelectedArticle({...selectedArticle, article_view_mode: e.target.value})}
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update Article</button>
          <button onClick={() => setSelectedArticle(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      )}

      {articles.map((article) => (
        <div key={article.article_id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-2">{article.article_name}</h2>
          <p>Date: {new Date(article.article_date).toLocaleString()}</p>
          <p>View Mode: {article.article_view_mode}</p>
          <p>Categories: {article.categorys.map(cat => cat.category_name).join(', ')}</p>
          <button onClick={() => handleEdit(article)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 mt-2">Edit</button>
          <button onClick={() => handleDelete(article.article_id)} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Delete</button>
        </div>
      ))}

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminArticleManager;