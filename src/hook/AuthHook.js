import { useState, useEffect, useCallback } from 'react';
import OAuthSDK from '../nanuid_auth_sdk'

const useAuthCheck = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);

    const refreshTokenAndUpdate = useCallback(async () => {
        const newAccessToken = await OAuthSDK.refreshToken();
        if (newAccessToken) {
            setToken(newAccessToken);
            setIsAuthenticated(true);
        } else {
            setToken(null);
            setIsAuthenticated(false);
        }
        return newAccessToken;
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            const accessToken = OAuthSDK.getAccessToken();

            if (accessToken) {
                const isExpired = await OAuthSDK.isTokenExpired(accessToken);
                if (isExpired) {
                    await refreshTokenAndUpdate(); 
                } else {
                    setIsAuthenticated(true);
                    setToken(accessToken);
                }
            } else {
                await refreshTokenAndUpdate(); 
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [refreshTokenAndUpdate]);

    return { isAuthenticated, isLoading, token, refreshTokenAndUpdate };
};

export default useAuthCheck;
