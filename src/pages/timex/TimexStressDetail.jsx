import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiZap } from 'react-icons/fi'
import ReactApexChart from 'react-apexcharts'
import Footer from '@/components/shared/Footer'

const trendOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#02a0e4'],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
    xaxis: {
        categories: ['19/01', '20/01', '21/01', '22/01', '23/01', '24/01', '25/01'],
        axisBorder: { show: false }, axisTicks: { show: false },
        labels: { style: { colors: '#91a1b6', fontSize: '10px' } }
    },
    yaxis: { min: 0, max: 100, labels: { style: { colors: '#91a1b6', fontSize: '10px' } } },
    grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 3, padding: { left: 4, right: 4 } },
    tooltip: { theme: 'light', style: { fontSize: '11px' }, y: { formatter: v => `${v} levels` } },
    dataLabels: { enabled: false },
    legend: { show: false },
}
const trendSeries = [{ name: 'Stress', data: [96, 77, 80, 67, 45, 50, 30] }]

const HISTORY = [
    { date: '30 Jan 2025  3:00 PM', value: '80 Levels' },
    { date: '30 Jan 2025  3:00 PM', value: '90 Levels' },
    { date: '30 Jan 2025  4:27 PM', value: '85 Levels' },
]

const STRESS_ZONES = [
    {
        label: 'Relaxed', range: '1–29 Levels', color: '#25b865',
        insight: 'Your mind and body are in a state of calm. Your heart rate, breathing, and muscle tension are all at ease, promoting cellular repair and emotional clarity.',
        when: 'During deep sleep, meditation, a walk in nature, or a relaxing activity you genuinely enjoy.',
    },
    {
        label: 'Normal', range: '30–59 Levels', color: '#02a0e4',
        insight: 'You are engaged and alert. This is healthy, functional stress — the kind that helps you focus, problem-solve, and stay motivated throughout the day.',
        when: 'During productive work sessions, light exercise, or social interactions you find stimulating.',
    },
    {
        label: 'Medium', range: '60–79 Levels', color: '#e49e3d',
        insight: 'Your stress response is elevated. Your body is working harder than usual, and sustained time in this zone can lead to fatigue, irritability, or disrupted sleep.',
        when: 'Tight deadlines, difficult conversations, moderate physical exertion, or managing multiple demands.',
    },
    {
        label: 'High', range: '80–99 Levels', color: '#d13b4c',
        insight: 'Your system is under significant load. Chronic time here can impact immunity, digestion, and cardiovascular health. Prioritising recovery is key.',
        when: 'Intense exercise, high-pressure situations, sleep deprivation, or emotional overwhelm.',
    },
]

const RangeBar = ({ value = 30 }) => {
    const pct = Math.min(100, Math.max(0, ((value - 1) / 98) * 100))
    return (
        <div style={{ paddingTop: 22, paddingBottom: 4 }}>
            <div style={{ position: 'relative' }}>
                <div style={{
                    position: 'absolute', left: `${pct}%`, bottom: '100%',
                    transform: 'translateX(-50%)', marginBottom: 4, textAlign: 'center'
                }}>
                    <span className="fs-11 fw-bold text-dark">{value}</span>
                </div>
                <div style={{
                    width: '100%', height: 10, borderRadius: 5,
                    background: 'linear-gradient(90deg,#25b865 0%,#02a0e4 30%,#e49e3d 65%,#d13b4c 100%)',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute', left: `${pct}%`, top: -3,
                        transform: 'translateX(-50%)', width: 3, height: 16,
                        background: '#283c50', borderRadius: 2
                    }} />
                </div>
            </div>
            <div className="d-flex justify-content-between fs-11 text-muted mt-1">
                <span>01</span><span>30</span><span>60</span><span>99</span>
            </div>
        </div>
    )
}

const TimexStressDetail = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="page-header">
                <div className="page-header-left d-flex align-items-center gap-3">
                    <button className="btn btn-light btn-sm d-flex align-items-center gap-1" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={14} /> Back
                    </button>
                    <div>
                        <h5 className="fw-bold text-dark mb-0">Stress</h5>
                        <p className="fs-12 text-muted mb-0">12 Jan 2025 · 4:27 PM</p>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="row g-3">

                    {/* Latest Reading */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-body">
                                <p className="fs-11 fw-semibold text-muted text-uppercase mb-1">Latest Reading</p>
                                <p className="fs-12 text-muted mb-3">12 Jan 2025 4:27 PM</p>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="d-flex align-items-baseline gap-2">
                                        <span className="fw-bolder text-success" style={{ fontSize: 52 }}>30</span>
                                        <span className="fs-14 text-muted">Levels</span>
                                    </div>
                                    <FiZap size={36} className="text-success opacity-25" />
                                </div>
                                <p className="fs-12 text-muted mb-2">Your Stress range is:</p>
                                <div className="py-2 px-3 rounded text-center fw-semibold fs-13 text-success"
                                    style={{ background: 'rgba(37,184,101,0.12)', border: '1px solid rgba(37,184,101,0.2)' }}>
                                    ↑ Normal
                                </div>
                                <RangeBar value={30} />
                                <div className="mt-3 p-3 rounded" style={{ background: 'rgba(0,0,0,0.03)' }}>
                                    <p className="fs-12 fw-semibold text-dark mb-1">Disclaimer:</p>
                                    <ul className="fs-11 text-muted mb-0 ps-3">
                                        <li>High 80–90 Levels</li>
                                        <li>Medium 60–79 Levels</li>
                                        <li>Normal 30–59 Levels</li>
                                        <li>Relaxed 1–29 Levels</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Last 7 Trends */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Last 7 Times Trends</h5>
                                <div className="d-flex gap-2">
                                    <span className="badge bg-soft-success text-success">Min 30</span>
                                    <span className="badge bg-soft-danger text-danger">Max 96</span>
                                </div>
                            </div>
                            <div className="card-body pt-2">
                                <ReactApexChart type="bar" options={trendOptions} series={trendSeries} height={200} />
                            </div>
                        </div>
                    </div>

                    {/* History */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Stress Readings — History</h5>
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
                                        <span className="fs-14 fw-semibold text-warning">{h.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stress Zones */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Stress Zones</h5>
                            </div>
                            <div className="card-body">
                                <p className="fs-12 text-muted mb-4">
                                    Stress is your body's way of responding to demand. Not all stress is harmful — understanding your zones helps you recognise when you're in flow and when you need to recover.
                                </p>
                                {STRESS_ZONES.map(z => (
                                    <div key={z.label} className="mb-4">
                                        <div className="d-flex align-items-center gap-2 mb-1">
                                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: z.color, flexShrink: 0 }} />
                                            <span className="fs-13 fw-semibold text-dark">{z.label} ({z.range})</span>
                                        </div>
                                        <div className="ms-4">
                                            <p className="fs-12 fw-semibold text-dark mb-1">The Insight:</p>
                                            <p className="fs-12 text-muted mb-1">{z.insight}</p>
                                            <p className="fs-12 fw-semibold text-dark mb-1">When to Expect It:</p>
                                            <p className="fs-12 text-muted mb-0">{z.when}</p>
                                        </div>
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

export default TimexStressDetail
