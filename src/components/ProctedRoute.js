import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthHook from '../hook/AuthHook';
import LoadingSpinner from './LoadingIcon';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = AuthHook();
    const location = useLocation();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        window.location.href = `https://id.nanu.cc/oauth?app_id=6b3bac76-bde8-4681-8c55-0e915d1c03b6&app_name=%EB%8F%99%ED%98%84%20%EA%B8%B0%EC%88%A0%20%EB%B8%94%EB%A1%9C%EA%B7%B8&redirect_uri=https://donghyun.cc/oauth_client`;
        return null;
    }

    return children;
};

export default ProtectedRoute;
