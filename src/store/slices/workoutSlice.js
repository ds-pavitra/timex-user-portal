import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/config';

export const fetchWorkouts = createAsyncThunk(
    'workouts/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiClient(API_ENDPOINTS.WORKOUTS.LIST);
            const responseData = data?.data;
            if (Array.isArray(responseData)) {
                return responseData.map((workout) => ({
                    ...workout,
                    isGpsWorkout: workout.isGpsWorkout ?? !!workout.route_points?.length,
                }));
            }
            const workouts = responseData?.workouts ?? [];
            const gpsWorkouts = responseData?.gps_workouts ?? [];
            const normalize = (items, isGps) => items.map((workout) => ({
                ...workout,
                isGpsWorkout: isGps,
            }));
            return [...normalize(workouts, false), ...normalize(gpsWorkouts, true)];
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
