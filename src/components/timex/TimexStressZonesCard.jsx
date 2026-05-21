import React from 'react'
import CardHeader from '@/components/shared/CardHeader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import StressChart from './StressChart'

const ZONES = [
    { label: 'Relaxed', pct: 60, bar: 'bg-success', text: 'text-success' },
    { label: 'Normal',  pct: 30, bar: 'bg-warning',  text: 'text-warning' },
    { label: 'High',    pct: 10, bar: 'bg-danger',   text: 'text-danger' },
]

const TimexStressZonesCard = () => {
    const { isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions()
    if (isRemoved) return null
    return (
        <div className={`card stretch stretch-full ${isExpanded ? 'card-fullscreen' : ''}`}>
            <CardHeader title="Stress Zones" refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
            <div className="card-body d-flex flex-column">
                <div style={{ minHeight: 100 }}>
                    <StressChart />
                </div>
                <div className="mt-3">
                    {ZONES.map(z => (
                        <div key={z.label} className="d-flex align-items-center gap-2 mb-2">
                            <span className={`fs-12 fw-semibold ${z.text}`} style={{ minWidth: 56 }}>{z.label}</span>
                            <div className="progress flex-grow-1" style={{ height: 6 }}>
                                <div className={`progress-bar ${z.bar}`} style={{ width: `${z.pct}%` }} />
                            </div>
                            <span className="fs-11 text-muted" style={{ minWidth: 30, textAlign: 'right' }}>{z.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TimexStressZonesCard
