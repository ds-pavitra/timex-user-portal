import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root";
import TimexDashboard from "../pages/timex/TimexDashboard";
import TimexActivity from "../pages/timex/TimexActivity";
import TimexWorkouts from "../pages/timex/TimexWorkouts";
import TimexSettings from "../pages/timex/TimexSettings";
import TimexWorkoutDetail from "../pages/timex/TimexWorkoutDetail";
import LayoutAuth from "../layout/layoutAuth";
import LoginCover from "../pages/login-cover";
import LoginMinimal from "../pages/login-minimal";
import LoginCreative from "../pages/login-creative";
import RegisterCover from "../pages/register-cover";
import RegisterMinimal from "../pages/register-minimal";
import RegisterCreative from "../pages/register-creative";
import ResetCover from "../pages/reset-cover";
import ResetMinimal from "../pages/reset-minimal";
import ResetCreative from "../pages/reset-creative";
import ErrorCover from "../pages/error-cover";
import ErrorCreative from "../pages/error-creative";
import ErrorMinimal from "../pages/error-minimal";
import OtpCover from "../pages/otp-cover";
import OtpMinimal from "../pages/otp-minimal";
import OtpCreative from "../pages/otp-creative";
import MaintenanceCover from "../pages/maintenance-cover";
import MaintenanceMinimal from "../pages/maintenance-minimal";
import MaintenanceCreative from "../pages/maintenance-creative";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/",           element: <TimexDashboard /> },
            { path: "/activity",   element: <TimexActivity /> },
            { path: "/workouts",        element: <TimexWorkouts /> },
            { path: "/workouts/view",   element: <TimexWorkoutDetail /> },
            { path: "/settings",   element: <TimexSettings /> },
        ]
    },
    {
        path: "/",
        element: <LayoutAuth />,
        children: [
            { path: "/authentication/login/cover",          element: <LoginCover /> },
            { path: "/authentication/login/minimal",        element: <LoginMinimal /> },
            { path: "/authentication/login/creative",       element: <LoginCreative /> },
            { path: "/authentication/register/cover",       element: <RegisterCover /> },
            { path: "/authentication/register/minimal",     element: <RegisterMinimal /> },
            { path: "/authentication/register/creative",    element: <RegisterCreative /> },
            { path: "/authentication/reset/cover",          element: <ResetCover /> },
            { path: "/authentication/reset/minimal",        element: <ResetMinimal /> },
            { path: "/authentication/reset/creative",       element: <ResetCreative /> },
            { path: "/authentication/404/cover",            element: <ErrorCover /> },
            { path: "/authentication/404/minimal",          element: <ErrorMinimal /> },
            { path: "/authentication/404/creative",         element: <ErrorCreative /> },
            { path: "/authentication/verify/cover",         element: <OtpCover /> },
            { path: "/authentication/verify/minimal",       element: <OtpMinimal /> },
            { path: "/authentication/verify/creative",      element: <OtpCreative /> },
            { path: "/authentication/maintenance/cover",    element: <MaintenanceCover /> },
            { path: "/authentication/maintenance/minimal",  element: <MaintenanceMinimal /> },
            { path: "/authentication/maintenance/creative", element: <MaintenanceCreative /> },
        ]
    }
])
