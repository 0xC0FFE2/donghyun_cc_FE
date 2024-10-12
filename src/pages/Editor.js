import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const MarkdownEditor = ({ initialContent, onSave }) => {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent.content);
      setTitle(initialContent.title);
      setThumbnailURL(initialContent.thumbnailURL);
      setSelectedCategories(initialContent.categories || []);
    } else {
      const savedContent = localStorage.getItem(`draft_${postId}`);
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        setContent(parsedContent.content);
        setTitle(parsedContent.title);
        setThumbnailURL(parsedContent.thumbnailURL);
        setSelectedCategories(parsedContent.categories || []);
      }
    }
  }, [initialContent, postId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5500/categories');
        setCategories(response.data);
      } catch (error) {
        toast.error('카테고리 목록을 불러오는 데 실패했습니다.');
      }
    };
    fetchCategories();
  }, []);

  const saveToLocalStorage = useCallback(() => {
    const contentToSave = { content, title, thumbnailURL, categories: selectedCategories };
    localStorage.setItem(`draft_${postId}`, JSON.stringify(contentToSave));
    toast.info('임시 저장되었습니다.');
  }, [content, title, thumbnailURL, selectedCategories, postId]);

  const uploadContent = async () => {
    setUploading(true);
    const formData = new FormData();
    const blob = new Blob([content], { type: 'text/markdown' });
    formData.append('file', blob, 'content.md');

    try {
      const response = await axios.post('http://localhost:5500/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileUrl(response.data.url);
      toast.success('파일이 성공적으로 업로드되었습니다!');
      return response.data.url;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('파일 업로드 중 오류가 발생했습니다.');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handlePublish = async (viewMode) => {
    try {
      const contentUrl = await uploadContent();
      const response = await axios.post('http://localhost:5500/admin/articles', {
        article_date: new Date().toISOString(),
        article_name: title,
        thumbnail_url: thumbnailURL,
        article_data_url: contentUrl,
        article_view_mode: viewMode,
        categories: selectedCategories,
      });
      toast.success('성공적으로 퍼블리싱되었습니다!');
      localStorage.removeItem(`draft_${postId}`);
    } catch (error) {
      toast.error('퍼블리싱 중 오류가 발생했습니다.');
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('카테고리 이름을 입력하세요.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5500/categories', {
        category_name: newCategoryName
      });
      setCategories([...categories, response.data]);
      setNewCategoryName('');
      toast.success('새 카테고리가 생성되었습니다.');
    } catch (error) {
      toast.error('카테고리 생성에 실패했습니다.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl mt-16">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      <h1 className="text-3xl font-bold mb-6">게시글 작성</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">썸네일 URL</label>
        <input
          type="text"
          value={thumbnailURL}
          onChange={(e) => setThumbnailURL(e.target.value)}
          placeholder="썸네일 URL을 입력하세요"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((category) => (
            <button
              key={category.category_id}
              onClick={() => handleCategoryToggle(category.category_id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategories.includes(category.category_id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category.category_name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="새 카테고리 이름"
            className="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreateCategory}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          >
            추가
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
        <MDEditor
          value={content}
          onChange={setContent}
          preview="edit"
          className="border border-gray-300 rounded-lg shadow-sm"
        />
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={saveToLocalStorage}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
        >
          임시 저장
        </button>
        <div>
          <button
            onClick={() => handlePublish('PRIVATE')}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200 mr-2"
            disabled={uploading}
          >
            비공개 퍼블리싱
          </button>
          <button
            onClick={() => handlePublish('PUBLIC')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={uploading}
          >
            공개 퍼블리싱
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;