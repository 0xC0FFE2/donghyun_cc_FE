import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileInput from '../components/FileInput';
import SubmitButton from '../components/FileUploadButton';

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (file) => {
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('파일을 선택해주세요.');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5500/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFileUrl(response.data.url);
            toast.success('파일이 성공적으로 업로드되었습니다!');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('파일 업로드 중 오류가 발생했습니다.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">파일 업로드</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FileInput onFileChange={handleFileChange} />
                <SubmitButton uploading={uploading} />
            </form>
            {fileUrl && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium">업로드된 파일 URL:</h3>
                    <a href={fileUrl} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        {fileUrl}
                    </a>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default FileUploader;
