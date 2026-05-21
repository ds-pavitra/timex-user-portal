import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import useCardTitleActions from '@/hooks/useCardTitleActions'

const STAGES = [
    { label: 'Awake',  dur: '30 min', pct: 7,  color: 'bg-info' },
    { label: 'Light',  dur: '2h 15m', pct: 35, color: 'bg-success' },
    { label: 'Deep',   dur: '1h 45m', pct: 28, color: 'bg-primary' },
    { label: 'REM',    dur: '1h 55m', pct: 30, color: 'bg-info' },
]

const TimexSleepCard = () => {
    const { isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions()
    if (isRemoved) return null
    return (
        <div className={`card stretch stretch-full ${isExpanded ? 'card-fullscreen' : ''}`}>
            <CardHeader title="Sleep Breakdown" refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                        <h4 className="fw-bolder text-dark mb-0">
                            6:30 <small className="fs-13 fw-normal text-muted">hrs</small>
                        </h4>
                        <p className="fs-12 text-muted mb-0">Last night</p>
                    </div>
                    <span className="badge bg-soft-danger text-danger fs-11">Below ideal (8h)</span>
                </div>
                {STAGES.map(s => (
                    <div key={s.label} className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                            <span className="fs-12 fw-medium text-dark">{s.label}</span>
                            <span className="fs-12 text-muted">{s.dur}</span>
                        </div>
                        <div className="progress" style={{ height: 6 }}>
                            <div className={`progress-bar ${s.color}`} style={{ width: `${s.pct}%` }} />
                        </div>
                    </div>
                ))}
                <div className="mt-3 pt-3 border-top">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fs-12 fw-semibold text-dark">Sleep Quality</span>
                        <span className="fs-12 fw-bold text-primary">72%</span>
                    </div>
                    <div className="progress" style={{ height: 8 }}>
                        <div className="progress-bar bg-primary" style={{ width: '72%' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimexSleepCard
