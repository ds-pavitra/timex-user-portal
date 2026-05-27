import { BASE_URL } from './config';

const apiClient = async (endpoint, { method = 'GET', body, headers = {} } = {}) => {
    const token = sessionStorage.getItem('access_token');

    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
        },
        ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok || data.status === 'error') {
        throw new Error(data.message || 'Request failed');
    }

    return data;
};

export default apiClient;
