import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import Alert from '../components/Alert';

const MarkdownEditor = ({ initialContent, onSave }) => {
  const { postId } = useParams();
  const [content, setContent] = useState("**Hello world!!!**");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent.content);
      setTitle(initialContent.title);
      setTags(initialContent.tags);
    } else {
      const savedContent = localStorage.getItem(`draft_${postId}`);
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        setContent(parsedContent.content);
        setTitle(parsedContent.title);
        setTags(parsedContent.tags);
      }
    }
  }, [initialContent, postId]);

  const saveToLocalStorage = useCallback(() => {
    const contentToSave = { content, title, tags };
    localStorage.setItem(`draft_${postId}`, JSON.stringify(contentToSave));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, [content, title, tags, postId]);

  useEffect(() => {
    const intervalId = setInterval(saveToLocalStorage, 2000);
    return () => clearInterval(intervalId);
  }, [saveToLocalStorage]);

  const handleSave = () => {
    onSave({ content, title, tags });
    localStorage.removeItem(`draft_${postId}`);
  };

  const handleTagChange = (e) => {
    setTags(e.target.value.split(',').map(tag => tag.trim()));
  };

  return (
    <div className="container mx-auto px-4 py-12 pt-20">
      <div className="max-w-3xl mx-auto">
        {showNotification && (
          <Alert className="mb-4">
            임시 저장되었습니다.
          </Alert>
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          value={tags.join(', ')}
          onChange={handleTagChange}
          placeholder="태그를 입력하세요 (쉼표로 구분)"
          className="w-full mb-4 p-2 border rounded"
        />
        <MDEditor
          value={content}
          onChange={setContent}
          preview="edit"
        />
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default MarkdownEditor;