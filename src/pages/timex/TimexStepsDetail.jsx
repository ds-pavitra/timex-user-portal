import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiActivity, FiNavigation, FiZap, FiClock, FiTrendingUp } from 'react-icons/fi'
import ReactApexChart from 'react-apexcharts'
import Footer from '@/components/shared/Footer'

const hourlyOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#25b865'],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    xaxis: {
        categories: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'],
        axisBorder: { show: false }, axisTicks: { show: false },
        labels: { style: { colors: '#91a1b6', fontSize: '9px' }, rotate: -30 }
    },
    yaxis: { min: 0, max: 2000, labels: { style: { colors: '#91a1b6', fontSize: '10px' } } },
    grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 3, padding: { left: 4, right: 4 } },
    tooltip: { theme: 'light', style: { fontSize: '11px' }, y: { formatter: v => `${v} steps` } },
    dataLabels: { enabled: false },
    legend: { show: false },
}
const hourlySeries = [{ name: 'Steps', data: [120, 450, 800, 1200, 600, 900, 400, 750, 1100, 1400, 800, 950, 300, 600, 450, 200] }]

const weeklyOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#3454d1'],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisBorder: { show: false }, axisTicks: { show: false },
        labels: { style: { colors: '#91a1b6', fontSize: '11px' } }
    },
    yaxis: { min: 0, max: 14000, labels: { style: { colors: '#91a1b6', fontSize: '10px' }, formatter: v => `${(v / 1000).toFixed(0)}k` } },
    grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 3, padding: { left: 4, right: 4 } },
    tooltip: { theme: 'light', style: { fontSize: '11px' }, y: { formatter: v => `${v.toLocaleString()} steps` } },
    dataLabels: { enabled: false },
    annotations: {
        yaxis: [{ y: 10000, borderColor: '#e49e3d', strokeDashArray: 4, label: { text: 'Goal 10k', style: { color: '#e49e3d', fontSize: '11px', background: 'transparent' } } }]
    },
    legend: { show: false },
}
const weeklySeries = [{ name: 'Steps', data: [8200, 11400, 6800, 9500, 7200, 12300, 6521] }]

const HISTORY = [
    { date: '30 Jan 2025  End of Day', value: '8,200 steps' },
    { date: '29 Jan 2025  End of Day', value: '11,400 steps' },
    { date: '28 Jan 2025  End of Day', value: '6,800 steps' },
    { date: '27 Jan 2025  End of Day', value: '9,500 steps' },
    { date: '26 Jan 2025  End of Day', value: '7,200 steps' },
]

const STATS = [
    { label: 'Distance',    value: '4.2',  unit: 'km',  icon: <FiNavigation size={14} />, bg: 'bg-soft-primary text-primary' },
    { label: 'Calories',    value: '312',  unit: 'kcal', icon: <FiZap size={14} />,        bg: 'bg-soft-danger text-danger'  },
    { label: 'Active Time', value: '1:20', unit: 'hr',  icon: <FiClock size={14} />,       bg: 'bg-soft-success text-success'},
    { label: 'Floors',      value: '8',    unit: 'fl',  icon: <FiTrendingUp size={14} />,  bg: 'bg-soft-warning text-warning'},
]

const STEPS_TODAY = 6521
const GOAL = 10000
const pctGoal = Math.round((STEPS_TODAY / GOAL) * 100)

const TimexStepsDetail = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="page-header">
                <div className="page-header-left d-flex align-items-center gap-3">
                    <button className="btn btn-light btn-sm d-flex align-items-center gap-1" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={14} /> Back
                    </button>
                    <div>
                        <h5 className="fw-bold text-dark mb-0">Steps</h5>
                        <p className="fs-12 text-muted mb-0">Today · 31 Jan 2025</p>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="row g-3">

                    {/* Today's steps */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-body">
                                <p className="fs-11 fw-semibold text-muted text-uppercase mb-1">Steps Today</p>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="d-flex align-items-baseline gap-2">
                                        <span className="fw-bolder text-success" style={{ fontSize: 48 }}>6,521</span>
                                        <span className="fs-14 text-muted">steps</span>
                                    </div>
                                    <FiActivity size={36} className="text-success opacity-25" />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="fs-12 text-muted">{pctGoal}% of daily goal</span>
                                    <span className="fs-12 text-muted">Goal: {GOAL.toLocaleString()}</span>
                                </div>
                                <div className="progress" style={{ height: 10, borderRadius: 5 }}>
                                    <div className="progress-bar bg-success" style={{ width: `${pctGoal}%`, borderRadius: 5 }} />
                                </div>
                                <p className="fs-12 text-muted mt-2 mb-0">{(GOAL - STEPS_TODAY).toLocaleString()} steps remaining to reach your goal</p>

                                <div className="row g-2 mt-3">
                                    {STATS.map(s => (
                                        <div key={s.label} className="col-6">
                                            <div className="card mb-0">
                                                <div className="card-body py-3 px-3">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <span className="fs-12 text-muted">{s.label}</span>
                                                        <div className={`avatar-text avatar-sm ${s.bg}`}>{s.icon}</div>
                                                    </div>
                                                    <div>
                                                        <span className="fw-bolder text-dark" style={{ fontSize: 20 }}>{s.value}</span>
                                                        <span className="fs-12 text-muted ms-1">{s.unit}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hourly distribution */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Hourly Distribution</h5>
                                <span className="badge bg-soft-success text-success">Today</span>
                            </div>
                            <div className="card-body pt-2">
                                <ReactApexChart type="bar" options={hourlyOptions} series={hourlySeries} height={240} />
                            </div>
                        </div>
                    </div>

                    {/* Weekly comparison */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Weekly Comparison</h5>
                                <span className="badge bg-soft-warning text-warning">Goal: 10,000</span>
                            </div>
                            <div className="card-body pt-2">
                                <ReactApexChart type="bar" options={weeklyOptions} series={weeklySeries} height={200} />
                                <div className="row g-2 mt-2 pt-2 border-top text-center">
                                    <div className="col-4">
                                        <p className="fs-11 text-muted mb-1">Best Day</p>
                                        <span className="fs-14 fw-semibold text-success">12,300</span>
                                    </div>
                                    <div className="col-4">
                                        <p className="fs-11 text-muted mb-1">Weekly Avg</p>
                                        <span className="fs-14 fw-semibold text-primary">8,703</span>
                                    </div>
                                    <div className="col-4">
                                        <p className="fs-11 text-muted mb-1">Weekly Total</p>
                                        <span className="fs-14 fw-semibold text-dark">60,921</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* History */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Daily Steps — History</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <label className="fs-12 text-muted mb-1 d-block">From date</label>
                                        <input type="date" className="form-control form-control-sm" defaultValue="2025-01-01" />
                                    </div>
                                    <div className="col-6">
                                        <label className="fs-12 text-muted mb-1 d-block">To date</label>
                                        <input type="date" className="form-control form-control-sm" defaultValue="2025-01-31" />
                                    </div>
                                </div>
                                {HISTORY.map((h, i) => (
                                    <div key={i} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                                        <span className="fs-13 text-muted">{h.date}</span>
                                        <span className="fs-14 fw-semibold text-success">{h.value}</span>
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

export default TimexStepsDetail
