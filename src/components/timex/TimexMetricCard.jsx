import React from 'react'
import { FiArrowUp, FiArrowDown } from 'react-icons/fi'

const colorMap = {
    cyan:   { text: 'text-info',    progress: 'bg-info' },
    green:  { text: 'text-success', progress: 'bg-success' },
    red:    { text: 'text-danger',  progress: 'bg-danger' },
    amber:  { text: 'text-warning', progress: 'bg-warning' },
    purple: { text: 'text-primary', progress: 'bg-primary' },
}

const TimexMetricCard = ({
    label, value, unit, change, changeDir = 'up',
    progress, color = 'cyan', icon, children,
    goalLabel, minLabel, timestamp
}) => {
    const c = colorMap[color] || colorMap.cyan
    return (
        <div className="card stretch stretch-full">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="fs-11 fw-semibold text-muted text-uppercase mb-0">{label}</p>
                    {icon && <span className={c.text}>{icon}</span>}
                </div>

                <div className="d-flex align-items-end justify-content-between">
                    <h3 className={`fw-bolder mb-0 ${c.text}`} style={{ fontSize: 26 }}>
                        {value}
                        {unit && <small className="fs-14 fw-normal text-muted ms-1">{unit}</small>}
                    </h3>
                    {timestamp && <span className="fs-12 text-muted pb-1">{timestamp}</span>}
                </div>

                {!timestamp && change && (
                    <p className={`fs-12 mb-0 mt-1 ${changeDir === 'up' ? 'text-success' : 'text-danger'}`}>
                        {changeDir === 'up'
                            ? <FiArrowUp size={11} className="me-1" />
                            : <FiArrowDown size={11} className="me-1" />
                        }
                        {change}
                    </p>
                )}

                {children}

                {!timestamp && progress !== undefined && !children && (
                    <>
                        <div className="progress mt-3" style={{ height: 4 }}>
                            <div className={`progress-bar ${c.progress}`} style={{ width: `${progress}%` }} />
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <span className="fs-11 text-muted">{minLabel}</span>
                            <span className="fs-11 text-muted">{goalLabel}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default TimexMetricCard
