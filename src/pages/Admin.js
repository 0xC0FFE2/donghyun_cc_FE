import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../__CONF__';
import OAuthSDK from '../nanuid_auth_sdk';
import LoadingSpinner from '../components/LoadingIcon';

const AdminArticleManager = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const navigate = useNavigate();

    const verifyAndFetchArticles = useCallback(async () => {
        try {
            const accessToken = await OAuthSDK.checkAuthentication();
            if (!accessToken) {
                toast.error('세션이 만료되었습니다. 다시 로그인해 주세요.');
                navigate('/');
                return;
            }
            await fetchArticles(accessToken);
        } catch (error) {
            toast.error('기사를 가져오는 중 오류가 발생했습니다.');
        }
    }, [navigate]);

    const fetchArticles = useCallback(async (accessToken) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/articles`, {
                params: { page: currentPage, size: 8 },
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            setArticles(response.data.articles);
            setTotalPages(response.data.totalPage);
        } catch (error) {
            console.error('기사 가져오기 오류:', error);
            throw error;
        }
    }, [currentPage]);


    useEffect(() => {
        verifyAndFetchArticles();
    }, [verifyAndFetchArticles]);


    const handleUpdate = async () => {
        try {
            const accessToken = await OAuthSDK.checkAuthentication();
            if (!accessToken) return navigate('/');

            await axios.put(`${API_BASE_URL}/admin/articles/${selectedArticle.article_id}`, {
                article_name: selectedArticle.article_name,
                thumbnail_url: selectedArticle.thumbnail_url,
                article_data_url: selectedArticle.article_data_url,
                article_view_mode: selectedArticle.article_view_mode,
                categories: selectedArticle.categorys.map(cat => cat.category_id)
            }, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            toast.success('정상적으로 수정을 완료했어요!');
            setSelectedArticle(null);
            fetchArticles(accessToken);
        } catch (error) {
            toast.error('오류가 발생했어요');
        }
    };

    const handleDelete = async (articleId) => {
        if (window.confirm('정말로 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다!')) {
            try {
                const accessToken = await OAuthSDK.checkAuthentication();
                if (!accessToken) return navigate('/');

                await axios.delete(`${API_BASE_URL}/admin/articles/${articleId}`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                toast.success('정상적으로 삭제를 완료했어요!');
                fetchArticles(accessToken);
            } catch (error) {
                toast.error('오류가 발생했어요');
            }
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (!articles.length) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">게시글 관리</h1>
            <Link to="/editor/new" className="mb-4 inline-block bg-green-500 text-white px-4 py-2 rounded">
                새 게시글 작성하기
            </Link>

            {selectedArticle && (
                <div className="bg-gray-100 p-4 mb-4 rounded">
                    <h2 className="text-xl font-bold mb-2">게시글 수정하기</h2>
                    <input
                        className="w-full p-2 mb-2 border rounded"
                        value={selectedArticle.article_name}
                        onChange={(e) => setSelectedArticle({ ...selectedArticle, article_name: e.target.value })}
                        placeholder="Article Name"
                    />
                    <input
                        className="w-full p-2 mb-2 border rounded"
                        value={selectedArticle.thumbnail_url}
                        onChange={(e) => setSelectedArticle({ ...selectedArticle, thumbnail_url: e.target.value })}
                        placeholder="Thumbnail URL"
                    />
                    <input
                        className="w-full p-2 mb-2 border rounded"
                        value={selectedArticle.article_data_url}
                        onChange={(e) => setSelectedArticle({ ...selectedArticle, article_data_url: e.target.value })}
                        placeholder="Article Data URL"
                    />
                    <select
                        className="w-full p-2 mb-2 border rounded"
                        value={selectedArticle.article_view_mode}
                        onChange={(e) => setSelectedArticle({ ...selectedArticle, article_view_mode: e.target.value })}
                    >
                        <option value="PUBLIC">공개</option>
                        <option value="PRIVATE">비공개</option>
                    </select>
                    <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">업데이트하기</button>
                    <button onClick={() => setSelectedArticle(null)} className="bg-gray-500 text-white px-4 py-2 rounded">취소</button>
                </div>
            )}

            {articles.map((article) => (
                <div key={article.article_id} className="bg-gray-50 rounded-xl px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-bold mb-2">{article.article_name}</h2>
                    <p>최초 게시 일자 : {new Date(article.article_date).toLocaleString()}</p>
                    <p>현재 공개 여부 : {article.article_view_mode}</p>
                    <p>카테고리 : {article.categorys.map(cat => cat.category_name).join(', ')}</p>
                    <button onClick={() => setSelectedArticle(article)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 mt-2">정보 수정하기</button>
                    <button onClick={() => handleDelete(article.article_id)} className="bg-red-500 text-white px-4 py-2 rounded mt-2">삭제하기</button>
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
