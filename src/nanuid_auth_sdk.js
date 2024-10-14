import axios from 'axios';
const AUTH_BASE_URL = 'https://auth.nanu.cc';

export const OAuthSDK = {
    getAccessToken: () => {
        return document.cookie.replace(/(?:(?:^|.*;\s*)ACCESS\s*=\s*([^;]*).*$)|^.*$/, "$1");
    },

    setAccessToken: (token, days = 1) => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `ACCESS=${encodeURIComponent(token)}; expires=${expires}; path=/`;
    },

    getRefreshToken: () => {
        return localStorage.getItem('REFRESH');
    },

    setRefreshToken: (token) => {
        localStorage.setItem('REFRESH', token);
    },

    isTokenExpired: async (token) => {
        try {
            const response = await axios.post(`${AUTH_BASE_URL}/api/mypage`, null, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.status !== 200;
        } catch (error) {
            console.error('Error validating token:', error);
            return true;
        }
    },

    refreshToken: async () => {
        const refreshToken = OAuthSDK.getRefreshToken();
        if (refreshToken) {
            try {
                const response = await axios.post(`${AUTH_BASE_URL}/api/oauth/refresh`, { refresh_token: refreshToken });
                const newAccessToken = response.data.access_token;
                OAuthSDK.setAccessToken(newAccessToken);
                return newAccessToken;
            } catch (error) {
                console.error('Token refresh failed:', error);
                return null;
            }
        }
        return null;
    },

    checkAuthentication: async () => {
        const accessToken = OAuthSDK.getAccessToken();
        if (accessToken) {
            const isExpired = await OAuthSDK.isTokenExpired(accessToken);
            if (isExpired) {
                return await OAuthSDK.refreshToken();
            }
            return accessToken;
        }
        return await OAuthSDK.refreshToken();
    },

    logout: () => {
        document.cookie = 'ACCESS=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('REFRESH');
    },

    setTokens: (accessToken, refreshToken, days = 1) => {
        OAuthSDK.setAccessToken(accessToken, days);
        OAuthSDK.setRefreshToken(refreshToken);
    }
};

export default OAuthSDK;