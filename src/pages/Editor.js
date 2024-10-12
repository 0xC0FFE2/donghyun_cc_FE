import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MarkdownEditor = ({ initialContent, onSave }) => {
  const { postId } = useParams();
  const [content, setContent] = useState("**Hello world!!!**");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [URL, setURL] = useState("");

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent.content);
      setTitle(initialContent.title);
      setURL(initialContent.URL); 
      setTags(initialContent.tags);
      setThumbnail(initialContent.thumbnail);
      setThumbnailPreview(initialContent.thumbnail ? URL.createObjectURL(initialContent.thumbnail) : null);
    } else {
      const savedContent = localStorage.getItem(`draft_${postId}`);
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        setContent(parsedContent.content);
        setTitle(parsedContent.title);
        setTags(parsedContent.tags);
        setURL(parsedContent.URL);
        if (parsedContent.thumbnail) {
          setThumbnail(parsedContent.thumbnail);
          setThumbnailPreview(URL.createObjectURL(parsedContent.thumbnail));
        }
      }
    }
  }, [initialContent, postId]);

  const saveToLocalStorage = useCallback(() => {
    const contentToSave = { content, title, tags, thumbnail, URL };
    localStorage.setItem(`draft_${postId}`, JSON.stringify(contentToSave));
    toast.info('브라우저 내에 임시 저장되었습니다.', { position: 'top-right' });
  }, [content, title, tags, thumbnail, URL, postId]);

  useEffect(() => {
    const intervalId = setInterval(saveToLocalStorage, 10000);
    return () => clearInterval(intervalId);
  }, [saveToLocalStorage]);

  const handleSave = () => {
    onSave({ content, title, tags, thumbnail, URL });
    localStorage.removeItem(`draft_${postId}`);
    toast.success('저장되었습니다!', { position: 'top-right' });
  };

  const handleTagChange = (e) => {
    setTags(e.target.value.split(',').map(tag => tag.trim()));
  };

  return (
    <div className="container mx-auto px-4 py-12 pt-20">
      <div className="max-w-3xl mx-auto">
        <ToastContainer />
        <h1 className="pt-10 font-bold text-xl">게시글 제목</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full mb-4 p-2 border rounded"
        />
        <h1 className="pt-2 font-bold text-xl">게시글 태그</h1>
        <input
          type="text"
          value={tags.join(', ')}
          onChange={handleTagChange}
          placeholder="태그를 입력하세요 (쉼표로 구분)"
          className="w-full mb-4 p-2 border rounded"
        />
        <h1 className="pt-2 font-bold text-xl">썸네일 링크</h1>
        <input
          type="text"
          value={URL} 
          onChange={(e) => setURL(e.target.value)}
          placeholder="썸네일 링크를 입력하세요"
          className="w-full mb-4 p-2 border rounded"
        />
        <MDEditor
          value={content}
          onChange={setContent}
          preview="edit"
          className="pt-1"
        />
        
        <button
          onClick={handleSave}
          className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          비공개 상태로 퍼블리싱하기
        </button>
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
        >
          퍼블리싱하기
        </button>
        <button
          onClick={handleSave}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3"
        >
          삭제 처리하기
        </button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
