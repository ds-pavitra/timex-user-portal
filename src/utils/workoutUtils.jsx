import React from 'react';

export const WORKOUT_TYPE_CONFIG = {
    Walking: {
        iconBg: 'rgba(2,160,228,0.1)',
        iconBorder: 'rgba(2,160,228,0.2)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#02a0e4" strokeWidth="2">
                <circle cx="12" cy="5" r="2" /><path d="M12 12v7M9 9l3 3 3-3" />
            </svg>
        ),
    },
    Running: {
        iconBg: 'rgba(228,158,61,0.1)',
        iconBorder: 'rgba(228,158,61,0.2)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e49e3d" strokeWidth="2">
                <circle cx="12" cy="5" r="2" /><path d="M5 22v-5l3-5 4 3 4-3 3 5v5M9 12l1 3" />
            </svg>
        ),
    },
    Tennis: {
        iconBg: 'rgba(209,59,76,0.1)',
        iconBorder: 'rgba(209,59,76,0.2)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d13b4c" strokeWidth="2">
                <circle cx="12" cy="5" r="2" /><path d="M5 22v-5l3-5 4 3 4-3 3 5v5" />
            </svg>
        ),
    },
    Yoga: {
        iconBg: 'rgba(52,84,209,0.1)',
        iconBorder: 'rgba(52,84,209,0.2)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3454d1" strokeWidth="2">
                <circle cx="12" cy="5" r="2" /><path d="M12 12v7M9 9l3 3 3-3" />
            </svg>
        ),
    },
    Cycling: {
        iconBg: 'rgba(37,184,101,0.1)',
        iconBorder: 'rgba(37,184,101,0.2)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25b865" strokeWidth="2">
                <circle cx="5" cy="18" r="3" /><circle cx="19" cy="18" r="3" />
                <path d="M5.7 18h8.3l3-7H9l-1.5-3H5" />
            </svg>
        ),
    },
    Swimming: {
        iconBg: 'rgba(2,160,228,0.1)',
        iconBorder: 'rgba(2,160,228,0.2)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#02a0e4" strokeWidth="2">
                <path d="M3 12h18M3 16c3 2 6 2 9 0s6-2 9 0" /><circle cx="12" cy="7" r="2" />
            </svg>
        ),
    },
    default: {
        iconBg: 'rgba(108,117,125,0.1)',
        iconBorder: 'rgba(108,117,125,0.2)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="2">
                <circle cx="12" cy="5" r="2" /><path d="M12 12v7M9 9l3 3 3-3" />
            </svg>
        ),
    },
};

export const formatDuration = (seconds) => {
    const totalMins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (totalMins >= 60) {
        const hrs = Math.floor(totalMins / 60);
        const mins = totalMins % 60;
        return mins > 0 ? `${hrs}h ${mins} min` : `${hrs}h`;
    }
    return secs > 0 ? `${totalMins} min ${secs} sec` : `${totalMins} min`;
};

export const formatDistance = (meters, unit = 'km') => {
    if (!meters) return '—';
    const dist = unit === 'mi'
        ? (parseFloat(meters) / 1609.34).toFixed(1)
        : (parseFloat(meters) / 1000).toFixed(1);
    return `${dist} ${unit}`;
};

export const getAvgHeartRate = (hrArray) => {
    if (!hrArray?.length) return null;
    return Math.round(hrArray.reduce((a, b) => a + b, 0) / hrArray.length);
};

export const formatWorkoutMeta = (startTime, durationSeconds) => {
    const date = new Date(startTime);
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${timeStr} · ${formatDuration(durationSeconds)}`;
};

export const groupWorkoutsByDate = (workouts) => {
    const groups = {};
    workouts.forEach((workout) => {
        const date = new Date(workout.start_time);
        date.setHours(0, 0, 0, 0);
        const key = date.toISOString();
        if (!groups[key]) groups[key] = { date, workouts: [] };
        groups[key].workouts.push(workout);
    });
    return Object.values(groups).sort((a, b) => b.date - a.date);
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatGroupLabel = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dayLabel = `${DAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;
    if (date.getTime() === today.getTime()) return `Today · ${dayLabel}`;
    if (date.getTime() === yesterday.getTime()) return `Yesterday · ${dayLabel}`;
    return dayLabel;
};
