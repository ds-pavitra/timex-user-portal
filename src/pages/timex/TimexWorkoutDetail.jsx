import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    FiArrowLeft, FiTrash2, FiClock, FiActivity, FiZap,
    FiNavigation, FiTrendingUp, FiWind, FiRefreshCw, FiLayers, FiHeart
} from 'react-icons/fi'
import ReactApexChart from 'react-apexcharts'
import Footer from '@/components/shared/Footer'

/* ── stat slot definitions ─────────────────────────────────────────── */
const STAT_DEFS = {
    time:      { label: 'Duration',    value: '1:00',  unit: 'hr',     icon: <FiClock size={14} />,       bg: 'bg-soft-info text-info' },
    steps:     { label: 'Total Steps', value: '2,340', unit: 'steps',  icon: <FiActivity size={14} />,    bg: 'bg-soft-success text-success' },
    calories:  { label: 'Calories',    value: '312',   unit: 'kcal',   icon: <FiZap size={14} />,         bg: 'bg-soft-danger text-danger' },
    distance:  { label: 'Distance',    value: '2.4',   unit: 'km',     icon: <FiNavigation size={14} />,  bg: 'bg-soft-primary text-primary' },
    avg_pace:  { label: 'AVG Pace',    value: '5:30',  unit: 'min/km', icon: <FiTrendingUp size={14} />,  bg: 'bg-soft-warning text-warning' },
    avg_speed: { label: 'AVG Speed',   value: '10.9',  unit: 'km/h',   icon: <FiWind size={14} />,        bg: 'bg-soft-success text-success' },
    cadence:   { label: 'Cadence',     value: '72',    unit: 'spm',    icon: <FiRefreshCw size={14} />,   bg: 'bg-soft-info text-info' },
    laps:      { label: 'Laps',        value: '3',     unit: 'laps',   icon: <FiLayers size={14} />,      bg: 'bg-soft-primary text-primary' },
}

/* ── per-workout stat keys (heart rate + zones always shown separately) */
const WORKOUT_STATS = {
    'Yoga':           ['time', 'calories'],
    'Walking':        ['time', 'steps', 'calories', 'distance'],
    'Cycling':        ['time', 'calories'],
    'Skipping':       ['time', 'calories'],
    'Badminton':      ['time', 'steps', 'calories'],
    'Basketball':     ['time', 'steps', 'calories'],
    'Football':       ['time', 'steps', 'calories'],
    'Swimming':       ['time', 'calories'],
    'Climbing':       ['time', 'steps', 'calories'],
    'Tennis':         ['time', 'steps', 'calories'],
    'Rugby':          ['time', 'steps', 'calories'],
    'Golf':           ['time', 'steps', 'calories'],
    'Fitness':        ['time', 'calories'],
    'Dancing':        ['time', 'calories'],
    'Baseball':       ['time', 'steps', 'calories'],
    'Elliptical':     ['time', 'calories'],
    'Indoor Cycling': ['time', 'calories'],
    'Free Training':  ['time', 'calories'],
    'Rowing Machine': ['time', 'calories'],
    'GPS Walk':       ['time', 'steps', 'calories', 'distance', 'avg_pace', 'avg_speed', 'cadence', 'laps'],
    'Running':        ['time', 'steps', 'calories', 'distance'],
}

/* ── HR zones ─────────────────────────────────────────────────────── */
const HR_ZONES = [
    { label: 'Low',    color: '#02a0e4', pct: 85, time: '00:50:00' },
    { label: 'Normal', color: '#e49e3d', pct: 15, time: '00:10:00' },
    { label: 'Modest', color: '#25b865', pct: 0,  time: '00:00:00' },
    { label: 'High',   color: '#e47b3d', pct: 0,  time: '00:00:00' },
    { label: 'Max',    color: '#d13b4c', pct: 0,  time: '00:00:00' },
]

/* ── chart options ─────────────────────────────────────────────────── */
const chartOptions = {
    chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
    colors: ['#d13b4c'],
    stroke: { width: 2, curve: 'smooth' },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.15, opacityTo: 0, stops: [0, 100] } },
    markers: { size: 0 },
    xaxis: {
        categories: ['09:00', '09:15', '09:30', '09:45', '10:00'],
        axisBorder: { show: false }, axisTicks: { show: false },
        labels: { style: { colors: '#91a1b6', fontSize: '10px' } }
    },
    yaxis: { min: 60, max: 140, labels: { style: { colors: '#91a1b6', fontSize: '10px' } } },
    grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 3, padding: { left: 4, right: 4 } },
    tooltip: { theme: 'light', style: { fontSize: '11px' } },
    dataLabels: { enabled: false },
    legend: { show: false },
}
const chartSeries = [{ name: 'BPM', data: [118, 105, 95, 100, 110, 90, 85, 100, 115, 120] }]

/* ── sub-components ───────────────────────────────────────────────── */
const StatCard = ({ label, value, unit, icon, bg }) => (
    <div className="col-6 col-md-3">
        <div className="card mb-0">
            <div className="card-body py-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="fs-12 text-muted">{label}</span>
                    <div className={`avatar-text avatar-sm ${bg}`}>{icon}</div>
                </div>
                <div>
                    <span className="fw-bolder text-dark" style={{ fontSize: 22 }}>{value}</span>
                    <span className="fs-12 text-muted ms-1">{unit}</span>
                </div>
            </div>
        </div>
    </div>
)

/* ── main page ────────────────────────────────────────────────────── */
const TimexWorkoutDetail = () => {
    const navigate = useNavigate()
    const { state } = useLocation()

    const type = state?.type || 'GPS Walk'
    const meta = state?.meta || 'Today at 8:00 AM'

    const statKeys  = WORKOUT_STATS[type] ?? ['time', 'calories']

    return (
        <>
            <div className="page-header">
                <div className="page-header-left d-flex align-items-center gap-3">
                    <button className="btn btn-light btn-sm d-flex align-items-center gap-1" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={14} /> Back
                    </button>
                    <div>
                        <h5 className="fw-bold text-dark mb-0">{type}</h5>
                        <p className="fs-12 text-muted mb-0">{meta}</p>
                    </div>
                </div>
                <div className="page-header-right ms-auto">
                    <button className="btn btn-soft-danger btn-sm d-flex align-items-center gap-1">
                        <FiTrash2 size={13} /> Delete
                    </button>
                </div>
            </div>

            <div className="main-content">
                <div className="row g-3">

                    {/* Stat cards — only what this workout needs */}
                    {statKeys.map(key => {
                        const s = STAT_DEFS[key]
                        return s ? <StatCard key={key} {...s} /> : null
                    })}

                    {/* Heart Rate chart */}
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Heart Rate</h5>
                                <div className="avatar-text avatar-sm bg-soft-danger text-danger">
                                    <FiHeart size={14} />
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <ReactApexChart
                                    type="area"
                                    options={chartOptions}
                                    series={chartSeries}
                                    height={220}
                                />
                                <div className="row g-2 mt-1 pt-3 border-top align-items-center">
                                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-between justify-content-md-start gap-3">
                                        <span className="fs-13 text-muted">Avg. Heart Rate</span>
                                        <span className="px-3 py-1 rounded bg-soft-secondary text-dark fw-semibold fs-14">
                                            75 <small className="fs-11 fw-normal text-muted">Bpm</small>
                                        </span>
                                    </div>
                                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-between justify-content-md-start gap-3">
                                        <span className="fs-13 text-muted">Range</span>
                                        <div className="d-flex gap-2">
                                            <span className="px-3 py-1 rounded bg-soft-secondary text-dark fw-semibold fs-14">
                                                80 <small className="fs-11 fw-normal text-muted">Min</small>
                                            </span>
                                            <span className="px-3 py-1 rounded bg-soft-secondary text-dark fw-semibold fs-14">
                                                100 <small className="fs-11 fw-normal text-muted">Max</small>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Heart Rate Zones */}
                    <div className="col-12">
                        <div className="card mb-0">
                            <div className="card-header">
                                <h5 className="card-title">Heart Rate Zones</h5>
                            </div>
                            <div className="card-body">
                                {HR_ZONES.map(z => (
                                    <div key={z.label} className="d-flex align-items-center gap-3 mb-3">
                                        <span className="fs-13 fw-semibold" style={{ color: z.color, minWidth: 68 }}>{z.label}</span>
                                        <div className="progress flex-grow-1" style={{ height: 6 }}>
                                            <div className="progress-bar" style={{ width: `${z.pct || 1}%`, background: z.color }} />
                                        </div>
                                        <span className="fs-12 text-muted fw-medium" style={{ minWidth: 36, textAlign: 'right' }}>{z.pct}%</span>
                                        <span className="fs-12 text-muted" style={{ fontFamily: 'monospace', minWidth: 64 }}>{z.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default TimexWorkoutDetail
