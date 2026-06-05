export const BASE_URL = 'http://65.1.50.127/api/';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: 'v2/auth/login',
        LOGOUT: 'v2/auth/logout',
    },
    WORKOUTS: {
        LIST: 'v2/workouts/combined',
    },
    PROFILE: {
        DEMOGRAPHICS: 'v2/profile/demographics',
        HEALTH: 'v2/profile/health',
    },
    ACTIVITY: {
        DAILY_SUMMARY: 'v2/health/activity/daily-summary',
        INTRADAY: 'v2/health/activity',
        WEEKLY_SUMMARY: 'v2/health/activity/weekly-summary',
    },
};
