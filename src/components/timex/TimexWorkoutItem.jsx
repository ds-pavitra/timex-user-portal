import React from 'react'
import { useNavigate } from 'react-router-dom'

const TimexWorkoutItem = ({ icon, iconBg, iconBorder, type, gps, meta, stats, workout }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/workouts/view', { state: { type, gps, meta, iconBg, iconBorder, workout } })
    }

    return (
        <div className="card mb-2" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="card-body py-3">
                <div className="d-flex align-items-center gap-3">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                        style={{ width: 44, height: 44, background: iconBg, border: `1px solid ${iconBorder}` }}
                    >
                        {icon}
                    </div>
                    <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2">
                            <span className="fs-13 fw-semibold text-dark">{type}</span>
                            {gps && <span className="badge bg-soft-info text-info fs-10">GPS</span>}
                        </div>
                        <p className="fs-12 text-muted mb-0">{meta}</p>
                    </div>
                    <div className="d-flex gap-4 d-none d-md-flex">
                        {stats.map(s => (
                            <div key={s.label} className="text-center">
                                <div className="fs-13 fw-semibold text-dark">{s.value}</div>
                                <div className="fs-10 text-muted text-uppercase">{s.label}</div>
                            </div>
                        ))}
                    </div>
                    <span className="text-muted fs-18 ms-1">›</span>
                </div>
            </div>
        </div>
    )
}

export default TimexWorkoutItem
