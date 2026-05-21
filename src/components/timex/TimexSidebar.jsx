import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const TimexSidebar = () => {
    const [showLogout, setShowLogout] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        setShowLogout(false)
        navigate('/authentication/login/cover')
    }

    return (
        <aside className="tx-sidebar">
            {/* Logo */}
            <div className="tx-sidebar-logo">
                <div className="tx-logo-mark">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M19.07 4.93A10 10 0 1 0 4.93 19.07" />
                    </svg>
                </div>
                <div>
                    <div className="tx-logo-text">TIMEX</div>
                    <div className="tx-logo-sub">HEALTH DASHBOARD</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="tx-sidebar-nav">
                <div className="tx-nav-label">MAIN</div>

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `tx-nav-item${isActive ? ' active' : ''}`}
                >
                    <svg className="tx-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/activity"
                    className={({ isActive }) => `tx-nav-item${isActive ? ' active' : ''}`}
                >
                    <svg className="tx-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    Daily Activity
                </NavLink>

                <NavLink
                    to="/workouts"
                    className={({ isActive }) => `tx-nav-item${isActive ? ' active' : ''}`}
                >
                    <svg className="tx-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    Workouts
                    <span className="tx-nav-badge">3</span>
                </NavLink>

                <div className="tx-nav-label">ACCOUNT</div>

                <NavLink
                    to="/settings"
                    className={({ isActive }) => `tx-nav-item${isActive ? ' active' : ''}`}
                >
                    <svg className="tx-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    Settings
                </NavLink>
            </nav>

            {/* Footer / User Card */}
            <div className="tx-sidebar-footer">
                {showLogout && (
                    <div className="tx-logout-menu">
                        <button className="tx-logout-btn" onClick={handleLogout}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </button>
                    </div>
                )}
                <div
                    className="tx-user-card"
                    onClick={() => setShowLogout(v => !v)}
                >
                    <div className="tx-avatar">YS</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="tx-user-name">Yash Shah</div>
                        <div className="tx-user-email">yash@gmail.com</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a9ab0" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </div>
        </aside>
    )
}

export default TimexSidebar
