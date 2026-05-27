import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/config';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await apiClient(API_ENDPOINTS.AUTH.LOGIN, {
                method: 'POST',
                body: credentials,
            });
            sessionStorage.setItem('access_token', data.data.tokens.access_token);
            sessionStorage.setItem('refresh_token', data.data.tokens.refresh_token);
            sessionStorage.setItem('user', JSON.stringify(data.data.user));
            sessionStorage.setItem('profile', JSON.stringify(data.data.profile));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            const refreshToken = sessionStorage.getItem('refresh_token');
            await apiClient(API_ENDPOINTS.AUTH.LOGOUT, {
                method: 'POST',
                body: { refresh_token: refreshToken },
            });
        } catch {
            // ignore logout API errors — always clear session
        } finally {
            sessionStorage.clear();
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(sessionStorage.getItem('user') || 'null'),
        profile: JSON.parse(sessionStorage.getItem('profile') || 'null'),
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.profile = action.payload.data.profile;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.profile = null;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
