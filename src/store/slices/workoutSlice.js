import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/config';

export const fetchWorkouts = createAsyncThunk(
    'workouts/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiClient(API_ENDPOINTS.WORKOUTS.LIST);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const workoutSlice = createSlice({
    name: 'workouts',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkouts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkouts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchWorkouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default workoutSlice.reducer;
