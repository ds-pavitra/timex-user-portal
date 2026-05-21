import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiMoon } from 'react-icons/fi'
import ReactApexChart from 'react-apexcharts'
import Footer from '@/components/shared/Footer'

const STAGES = [
    { label: 'Awake',      dur: '30 min', pct: 7,  color: '#64748b', barColor: 'bg-secondary' },
    { label: 'Light Sleep', dur: '1h 30m', pct: 24, color: '#25b865', barColor: 'bg-success'   },
    { label: 'REM Sleep',  dur: '3h 30m', pct: 43, color: '#3454d1', barColor: 'bg-primary'   },
    { label: 'Deep Sleep', dur: '3h',     pct: 36, color: '#02a0e4', barColor: 'bg-info'      },
]

const historyChartOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false }, stacked: true },
    colors: ['#64748b', '#25b865', '#3454d1', '#02a0e4'],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    xaxis: {
        categories: ['19/01', '20/01', '21/01', '22/01', '23/01', '24/01', '25/01'],
        axisBorder: { show: false }, axisTicks: { show: false },
        labels: { style: { colors: '#91a1b6', fontSize: '10px' } }
    },
    yaxis: { max: 12, labels: { style: { colors: '#91a1b6', fontSize: '10px' }, formatter: v => `${v}h` } },
    grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 3, padding: { left: 4, right: 4 } },
    tooltip: { theme: 'light', style: { fontSize: '11px' }, y: { formatter: v => `${v}h` } },
    dataLabels: { enabled: false },
    legend: {
        show: true, position: 'bottom', fontSize: '11px',
        labels: { colors: '#91a1b6' },
        markers: { width: 8, height: 8, radius: 8 }
    },
}
const historyChartSeries = [
    { name: 'Awake',      data: [0.5, 0.3, 0.6, 0.4, 0.5, 0.3, 0.5] },
    { name: 'Light Sleep', data: [2,   1.5, 2.5, 1.8, 2,   1.5, 1.5] },
    { name: 'REM Sleep',  data: [3,   2.5, 3.5, 2.8, 3,   2.5, 3.5] },
    { name: 'Deep Sleep', data: [2.5, 1.8, 2,   2.2, 2.5, 2,   3]   },
]

const sleepLineOptions = {
    chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
    colors: ['#3454d1'],
    stroke: { width: 2, curve: 'smooth' },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.2, opacityTo: 0, stops: [0, 100] } },
    markers: { size: 0 },
    xaxis: {
        categories: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '8:30AM'],
        axisBorder: { show: false }, axisTicks: { show: false },
        labels: { style: { colors: '#91a1b6', fontSize: '10px' } }
    },
    yaxis: {
        min: 0, max: 4,
        labels: {
            style: { colors: '#91a1b6', fontSize: '10px' },
            formatter: v => ['', 'Deep', 'REM', 'Light', 'Awake'][v] || ''
        }
    },
    grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 3, padding: { left: 4, right: 4 } },
    tooltip: { theme: 'light', style: { fontSize: '11px' } },
    dataLabels: { enabled: false },
    legend: { show: false },
    annotations: {
        xaxis: [{ x: '8:10AM', x2: '8:30AM', fillColor: '#02a0e4', opacity: 0.1, label: { text: 'Deep 0h 20m', style: { color: '#02a0e4', fontSize: '10px' } } }]
    }
}
const sleepLineSeries = [{ name: 'Sleep Stage', data: [1, 2, 3, 2, 3, 4, 2, 3, 2, 4] }]

const HISTORY = [
    { date: '30 Jan 2025  3:00 PM', value: '8h 0m' },
    { date: '29 Jan 2025  3:00 PM', value: '7h 3m' },
    { date: '28 Jan 2025  4:27 PM', value: '4h 5m' },
]

const SleepRangeBar = () => (
    <div style={{ paddingTop: 8, paddingBottom: 4 }}>
        <div style={{
            width: '100%', height: 10, borderRadius: 5,
            background: 'linear-gradient(90deg,#d13b4c 0%,#e49e3d 25%,#e4c93d 45%,#25b865 65%,#02a0e4 85%,#3454d1 100%)',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute', left: '62%', top: -3,
                transform: 'translateX(-50%)', width: 3, height: 16,
                background: '#283c50', borderRadius: 2
            }} />
        </div>
        <div className="d-flex justify-content-between fs-11 text-muted mt-1">
            <span>0</span><span>3</span><span>6</span><span>9</span><span>12</span>
        </div>
    </div>
)

const TimexSleepDetail = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="page-header">
                <div className="page-header-left d-flex align-items-center gap-3">
                    <button className="btn btn-light btn-sm d-flex align-items-center gap-1" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={14} /> Back
                    </button>
                    <div>
                        <h5 className="fw-bold text-dark mb-0">Sleep</h5>
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
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="d-flex align-items-baseline gap-2">
                                        <span className="fw-bolder text-primary" style={{ fontSize: 42 }}>08</span>
                                        <span className="fs-14 text-muted">Hr</span>
                                        <span className="fw-bolder text-primary" style={{ fontSize: 42 }}>30</span>
                                        <span className="fs-14 text-muted">Min</span>
                                    </div>
                                    <FiMoon size={36} className="text-primary opacity-25" />
                                </div>

                                {/* Sleep stage grid */}
                                <div className="row g-2 mb-4">
                                    {STAGES.map(s => (
                                        <div key={s.label} className="col-6">
                                            <div className="p-2 rounded" style={{ background: 'rgba(0,0,0,0.04)' }}>
                                                <p className="fs-11 text-muted mb-1">{s.label}</p>
                                                <span className="fs-14 fw-semibold" style={{ color: s.color }}>{s.dur}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <p className="fs-12 text-muted mb-2">Your Sleep range is:</p>
                                <div className="py-2 px-3 rounded text-center fw-semibold fs-13 text-success"
                                    style={{ background: 'rgba(37,184,101,0.12)', border: '1px solid rgba(37,184,101,0.2)' }}>
                                    ✓ Ideal
                                </div>
                                <div className="mt-2">
                                    <div style={{
                                        width: '100%', height: 8, borderRadius: 4,
                                        background: 'linear-gradient(90deg,#d13b4c 0%,#e49e3d 25%,#e4c93d 45%,#25b865 65%,#02a0e4 100%)',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            position: 'absolute', left: '64%', top: -3,
                                            transform: 'translateX(-50%)', width: 3, height: 14,
                                            background: '#283c50', borderRadius: 2
                                        }} />
                                    </div>
                                    <div className="d-flex justify-content-between fs-11 text-muted mt-1">
                                        <span>0</span><span>3</span><span>6</span><span>9</span><span>12</span>
                                    </div>
                                </div>
                                <p className="fs-11 text-muted mt-3 mb-0">
                                    Poor: 0–4h (Severely sleep-deprived) · Insufficient: 4–6h · Fair: 6–8h (Min acceptable) · Ideal: 8–10h · Oversleep: 10–12h
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sleep timeline chart */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <div>
                                    <h5 className="card-title mb-0">30th Jan 2025</h5>
                                    <p className="fs-12 text-muted mb-0">Deep sleep: 8:10 AM–8:30 AM · 0h 20m</p>
                                </div>
                            </div>
                            <div className="card-body pt-2">
                                <ReactApexChart type="area" options={sleepLineOptions} series={sleepLineSeries} height={200} />
                                <div className="d-flex gap-3 flex-wrap mt-2">
                                    {STAGES.map(s => (
                                        <div key={s.label} className="d-flex align-items-center gap-1">
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                                            <span className="fs-11 text-muted">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* History chart */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Sleep History — Trends</h5>
                            </div>
                            <div className="card-body pt-2">
                                <ReactApexChart type="bar" options={historyChartOptions} series={historyChartSeries} height={220} />
                            </div>
                        </div>
                    </div>

                    {/* History list */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Sleep Data — History</h5>
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
                                        <span className="fs-14 fw-semibold text-primary">{h.value}</span>
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

export default TimexSleepDetail
