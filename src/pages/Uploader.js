import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileInput from '../components/FileInput';
import SubmitButton from '../components/FileUploadButton';
import { API_BASE_URL } from '../__CONF__';
import OAuthSDK from '../nanuid_auth_sdk';

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (file) => {
        setFile(file);
    };

    const verifyAndUpload = useCallback(async (formData) => {
        try {
            const accessToken = await OAuthSDK.checkAuthentication();
            if (!accessToken) {
                toast.error('세션이 만료되었습니다. 다시 로그인해 주세요.');
                navigate('/');
                return;
            }

            const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            setFileUrl(response.data.url);
            toast.success('파일이 성공적으로 업로드되었습니다!');
        } catch (error) {
            console.error('Error uploading file:', error);
            if (error.response && error.response.status === 401) {
                toast.error('인증에 실패했습니다. 다시 로그인해 주세요.');
                navigate('/');
            } else {
                toast.error('파일 업로드 중 오류가 발생했습니다.');
            }
        } finally {
            setUploading(false);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('파일을 선택해주세요.');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        await verifyAndUpload(formData);
    };

    const handlePaste = (e) => {
        const items = e.clipboardData.items;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.startsWith('image/')) {
                const pastedFile = items[i].getAsFile();
                setFile(pastedFile);
                toast.info('이미지가 클립보드에서 붙여넣기되었습니다.');
                return;
            }
        }
        toast.error('붙여넣기된 내용에 이미지가 없습니다.');
    };

    return (
        <div 
            className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16"
            onPaste={handlePaste}
        >
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
