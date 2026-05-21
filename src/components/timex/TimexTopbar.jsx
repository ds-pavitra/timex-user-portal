import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_META = {
    '/':          { title: 'Dashboard',     sub: 'Your health at a glance' },
    '/activity':  { title: 'Daily Activity', sub: 'Steps, distance & calories' },
    '/workouts':  { title: 'Workouts',       sub: 'History & GPS tracking' },
    '/settings':  { title: 'Settings',       sub: 'Preferences & device' },
}

const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

const TimexTopbar = () => {
    const { pathname } = useLocation()
    const [activeRange, setActiveRange] = useState('Today')
    const meta = PAGE_META[pathname] || { title: 'Timex', sub: '' }

    return (
        <div className="tx-topbar">
            <div>
                <div className="tx-page-title">{meta.title}</div>
                <div className="tx-page-sub">{meta.sub || today}</div>
            </div>
            <div className="tx-topbar-right">
                <div className="tx-date-range">
                    {['Today', 'Week', 'Month'].map(r => (
                        <button
                            key={r}
                            className={`tx-dr-btn${activeRange === r ? ' active' : ''}`}
                            onClick={() => setActiveRange(r)}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <div className="tx-device-chip">
                    <div className="tx-pulse" />
                    iConnect Max · 78%
                </div>

                <div className="tx-notif-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <div className="tx-notif-dot" />
                </div>
            </div>
        </div>
    )
}

export default TimexTopbar
