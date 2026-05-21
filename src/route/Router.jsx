import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root";
import TimexDashboard from "../pages/timex/TimexDashboard";
import TimexActivity from "../pages/timex/TimexActivity";
import TimexWorkouts from "../pages/timex/TimexWorkouts";
import TimexSettings from "../pages/timex/TimexSettings";
import TimexWorkoutDetail from "../pages/timex/TimexWorkoutDetail";
import TimexHeartRateDetail from "../pages/timex/TimexHeartRateDetail";
import TimexBloodOxygenDetail from "../pages/timex/TimexBloodOxygenDetail";
import TimexBloodPressureDetail from "../pages/timex/TimexBloodPressureDetail";
import TimexSleepDetail from "../pages/timex/TimexSleepDetail";
import TimexStressDetail from "../pages/timex/TimexStressDetail";
import TimexStepsDetail from "../pages/timex/TimexStepsDetail";
import LayoutAuth from "../layout/layoutAuth";
import LoginCreative from "../pages/login-creative";
import ResetCreative from "../pages/reset-creative";
import OtpCreative from "../pages/otp-creative";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/",                    element: <TimexDashboard /> },
            { path: "/activity",            element: <TimexActivity /> },
            { path: "/workouts",            element: <TimexWorkouts /> },
            { path: "/workouts/view",       element: <TimexWorkoutDetail /> },
            { path: "/settings",            element: <TimexSettings /> },
            { path: "/health/heart-rate",   element: <TimexHeartRateDetail /> },
            { path: "/health/blood-oxygen", element: <TimexBloodOxygenDetail /> },
            { path: "/health/blood-pressure", element: <TimexBloodPressureDetail /> },
            { path: "/health/sleep",        element: <TimexSleepDetail /> },
            { path: "/health/stress",       element: <TimexStressDetail /> },
            { path: "/health/steps",        element: <TimexStepsDetail /> },
        ]
    },
    {
        path: "/",
        element: <LayoutAuth />,
        children: [
            { path: "/authentication/login/creative",       element: <LoginCreative /> },
            { path: "/authentication/reset/creative",       element: <ResetCreative /> },
            { path: "/authentication/verify/creative",      element: <OtpCreative /> },
        ]
    }
])
