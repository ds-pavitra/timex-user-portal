import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    FiArrowLeft, FiTrash2, FiClock, FiActivity, FiZap,
    FiNavigation, FiTrendingUp, FiWind, FiRefreshCw, FiLayers, FiHeart
} from 'react-icons/fi'
import ReactApexChart from 'react-apexcharts'
import Footer from '@/components/shared/Footer'

/* ── per-workout stat keys ─────────────────────────────────────────── */
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

/* ── helpers ───────────────────────────────────────────────────────── */
const formatDuration = (seconds) => {
    if (!seconds) return '—'
    const totalMins = Math.floor(seconds / 60)
    const secs = seconds % 60
    if (totalMins >= 60) {
        const hrs = Math.floor(totalMins / 60)
        const mins = totalMins % 60
        return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}`
    }
    return secs > 0 ? `${totalMins}:${secs.toString().padStart(2, '0')}` : `${totalMins}`
}

const formatDurationUnit = (seconds) => {
    if (!seconds) return 'min'
    return Math.floor(seconds / 3600) >= 1 ? 'hr' : 'min'
}

const formatPace = (seconds) => {
    if (!seconds) return '—'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${String(secs).padStart(2, '0')}`
}

const formatDistance = (meters, unit = 'km') => {
    if (!meters) return '—'
    return unit === 'mi'
        ? (parseFloat(meters) / 1609.34).toFixed(1)
        : (parseFloat(meters) / 1000).toFixed(1)
}

const generateHRLabels = (startTime, count, durationSeconds) => {
    if (!startTime || !count) return []
    const start = new Date(startTime)
    const intervalMs = (durationSeconds / count) * 1000
    return Array.from({ length: count }, (_, i) => {
        const t = new Date(start.getTime() + i * intervalMs)
        return t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
}

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

    const workout = state?.workout
    const type = workout?.workout_type_name || state?.type || 'Walking'
    const meta = state?.meta || ''

    const hrArray = workout?.heart_rate ?? []
    const avgHR = hrArray.length
        ? Math.round(hrArray.reduce((a, b) => a + b, 0) / hrArray.length)
        : null
    const minHR = hrArray.length ? Math.min(...hrArray) : null
    const maxHR = hrArray.length ? Math.max(...hrArray) : null

    const distanceValue = formatDistance(workout?.distance_meters, workout?.distance_unit)
    const distanceUnit = workout?.distance_unit || 'km'
    const pace = workout?.avg_pace || workout?.pace
    const cadence = workout?.cadence || workout?.metadata?.avg_cadence

    const STAT_DEFS = {
        time: {
            label: 'Duration',
            value: formatDuration(workout?.duration_seconds),
            unit: formatDurationUnit(workout?.duration_seconds),
            icon: <FiClock size={14} />,
            bg: 'bg-soft-info text-info',
        },
        steps: {
            label: 'Total Steps',
            value: workout?.steps ? workout.steps.toLocaleString() : '—',
            unit: 'steps',
            icon: <FiActivity size={14} />,
            bg: 'bg-soft-success text-success',
        },
        calories: {
            label: 'Calories',
            value: workout?.calories ? Math.round(parseFloat(workout.calories)).toString() : '—',
            unit: 'kcal',
            icon: <FiZap size={14} />,
            bg: 'bg-soft-danger text-danger',
        },
        distance: {
            label: 'Distance',
            value: distanceValue,
            unit: distanceUnit,
            icon: <FiNavigation size={14} />,
            bg: 'bg-soft-primary text-primary',
        },
        avg_pace: {
            label: 'AVG Pace',
            value: formatPace(pace),
            unit: 'min/km',
            icon: <FiTrendingUp size={14} />,
            bg: 'bg-soft-warning text-warning',
        },
        avg_speed: {
            label: 'AVG Speed',
            value: workout?.avg_speed ? parseFloat(workout.avg_speed).toFixed(1) : '—',
            unit: 'km/h',
            icon: <FiWind size={14} />,
            bg: 'bg-soft-success text-success',
        },
        cadence: {
            label: 'Cadence',
            value: cadence ? cadence.toString() : '—',
            unit: 'spm',
            icon: <FiRefreshCw size={14} />,
            bg: 'bg-soft-info text-info',
        },
        laps: {
            label: 'Laps',
            value: workout?.laps ? workout.laps.toString() : '—',
            unit: 'laps',
            icon: <FiLayers size={14} />,
            bg: 'bg-soft-primary text-primary',
        },
    }

    const isGps = state?.gps ?? workout?.isGpsWorkout ?? false
    const GPS_EXTRA_KEYS = ['laps', 'avg_speed', 'avg_pace', 'cadence']
    const baseKeys = WORKOUT_STATS[type] ?? ['time', 'calories']
    const statKeys = isGps
        ? [...baseKeys, ...GPS_EXTRA_KEYS.filter(k => !baseKeys.includes(k))]
        : baseKeys

    const hrLabels = generateHRLabels(workout?.start_time, hrArray.length, workout?.duration_seconds)
    const yMin = hrArray.length ? Math.max(0, Math.min(...hrArray) - 10) : 50
    const yMax = hrArray.length ? Math.max(...hrArray) + 10 : 150

    const chartOptions = {
        chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
        colors: ['#d13b4c'],
        stroke: { width: 2, curve: 'smooth' },
        fill: { type: 'gradient', gradient: { opacityFrom: 0.15, opacityTo: 0, stops: [0, 100] } },
        markers: { size: 4 },
        xaxis: {
            categories: hrLabels,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#91a1b6', fontSize: '10px' } },
        },
        yaxis: {
            min: yMin,
            max: yMax,
            labels: { style: { colors: '#91a1b6', fontSize: '10px' } },
        },
        grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 3, padding: { left: 4, right: 4 } },
        tooltip: { theme: 'light', style: { fontSize: '11px' }, y: { formatter: (v) => `${v} bpm` } },
        dataLabels: { enabled: false },
        legend: { show: false },
    }
    const chartSeries = [{ name: 'BPM', data: hrArray }]

    /* HR zones: distribute based on actual HR range */
    const buildHRZones = () => {
        if (!hrArray.length || !maxHR) return []
        const zones = [
            { label: 'Low',    color: '#02a0e4', max: maxHR * 0.60 },
            { label: 'Normal', color: '#e49e3d', max: maxHR * 0.70 },
            { label: 'Modest', color: '#25b865', max: maxHR * 0.80 },
            { label: 'High',   color: '#e47b3d', max: maxHR * 0.90 },
            { label: 'Max',    color: '#d13b4c', max: maxHR },
        ]
        const counts = zones.map(z =>
            hrArray.filter(v => v <= z.max).length
        )
        const total = hrArray.length
        return zones.map((z, i) => ({
            ...z,
            pct: Math.round((counts[i] / total) * 100),
            time: new Date(Math.round((counts[i] / total) * (workout?.duration_seconds ?? 0)) * 1000)
                .toISOString().substring(11, 19),
        }))
    }
    const hrZones = buildHRZones()

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

                    {statKeys.map(key => {
                        const s = STAT_DEFS[key]
                        return s ? <StatCard key={key} {...s} /> : null
                    })}

                    {hrArray.length > 0 && (
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
                                                {avgHR} <small className="fs-11 fw-normal text-muted">Bpm</small>
                                            </span>
                                        </div>
                                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-between justify-content-md-start gap-3">
                                            <span className="fs-13 text-muted">Range</span>
                                            <div className="d-flex gap-2">
                                                <span className="px-3 py-1 rounded bg-soft-secondary text-dark fw-semibold fs-14">
                                                    {minHR} <small className="fs-11 fw-normal text-muted">Min</small>
                                                </span>
                                                <span className="px-3 py-1 rounded bg-soft-secondary text-dark fw-semibold fs-14">
                                                    {maxHR} <small className="fs-11 fw-normal text-muted">Max</small>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {hrZones.length > 0 && (
                        <div className="col-12">
                            <div className="card mb-0">
                                <div className="card-header">
                                    <h5 className="card-title">Heart Rate Zones</h5>
                                </div>
                                <div className="card-body">
                                    {hrZones.map(z => (
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
                    )}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default TimexWorkoutDetail
