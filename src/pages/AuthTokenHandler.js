import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingIcon';
import OAuthSDK from '../nanuid_auth_sdk';

const OAuthTokenHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get('ACCESS');
        const refreshToken = params.get('REFRESH');

        if (accessToken && refreshToken) {
            OAuthSDK.setTokens(accessToken, refreshToken);
            navigate('/admin', { replace: true });
        } else {
            navigate('/', { replace: true });
        }
    }, [navigate, location]);

    return <LoadingSpinner />;
};

export default OAuthTokenHandler;
