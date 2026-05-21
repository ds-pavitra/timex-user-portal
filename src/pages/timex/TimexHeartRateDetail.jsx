import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiHeart } from 'react-icons/fi'
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
    yaxis: { min: 0, max: 140, labels: { style: { colors: '#91a1b6', fontSize: '10px' } } },
    grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 3, padding: { left: 4, right: 4 } },
    tooltip: { theme: 'light', style: { fontSize: '11px' }, y: { formatter: v => `${v} bpm` } },
    dataLabels: { enabled: false },
    legend: { show: false },
}
const trendSeries = [{ name: 'Heart Rate', data: [96, 77, 100, 67, 85, 90, 80] }]

const HISTORY = [
    { date: '30 Jan 2025  3:00 PM', value: '80 bpm' },
    { date: '30 Jan 2025  3:00 PM', value: '90 bpm' },
    { date: '30 Jan 2025  4:27 PM', value: '85 bpm' },
]

const HR_ZONES = [
    {
        label: 'Very Light', range: '50–60 BPM', color: '#02a0e4',
        insight: 'Your heart is operating with high efficiency, requiring very little effort to pump blood.',
        when: 'During deep sleep, meditation, or while resting if you are highly physically active.',
    },
    {
        label: 'Light', range: '60–70 BPM', color: '#25b865',
        insight: "Your cardiovascular system is at ease, experiencing minimal stress while fully supporting your body's baseline needs.",
        when: 'Sitting quietly, reading, or relaxing on the couch.',
    },
    {
        label: 'Moderate', range: '70–80 BPM', color: '#25b865',
        insight: 'Your heart is providing steady, reliable energy to keep you moving through your standard routines.',
        when: 'Moving around the house, walking through the office, or doing light chores.',
    },
    {
        label: 'Hard', range: '80–90 BPM', color: '#e49e3d',
        insight: 'Your body is naturally stepping up its cardiac output to meet a moderate physical or emotional demand.',
        when: 'Taking a brisk walk, carrying groceries, or experiencing a moment of excitement.',
    },
    {
        label: 'Maximum', range: '90–100+ BPM', color: '#d13b4c',
        insight: 'Your heart is working significantly harder. While normal during a workout, staying in this zone while resting is a signal to pause and check in with your body.',
        when: 'During vigorous exercise, periods of high stress, or when fighting off an illness.',
    },
]

const RangeBar = ({ value = 82 }) => {
    const pct = Math.min(100, Math.max(0, ((value - 60) / 60) * 100))
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
                    background: 'linear-gradient(90deg,#02a0e4 0%,#25b865 40%,#e49e3d 70%,#d13b4c 100%)',
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
                <span>60</span><span>80</span><span>100</span><span>120</span>
            </div>
        </div>
    )
}

const TimexHeartRateDetail = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="page-header">
                <div className="page-header-left d-flex align-items-center gap-3">
                    <button className="btn btn-light btn-sm d-flex align-items-center gap-1" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={14} /> Back
                    </button>
                    <div>
                        <h5 className="fw-bold text-dark mb-0">Heart Rate</h5>
                        <p className="fs-12 text-muted mb-0">15 Feb 2025 · 10:15 AM</p>
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
                                <p className="fs-12 text-muted mb-3">15 Feb 2025 10:15 AM</p>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="d-flex align-items-baseline gap-2">
                                        <span className="fw-bolder text-danger" style={{ fontSize: 52 }}>82</span>
                                        <span className="fs-14 text-muted">bpm</span>
                                    </div>
                                    <FiHeart size={36} className="text-danger opacity-25" />
                                </div>
                                <p className="fs-12 text-muted mb-2">Your HR range is:</p>
                                <div className="py-2 px-3 rounded text-center fw-semibold fs-13 text-success"
                                    style={{ background: 'rgba(37,184,101,0.12)', border: '1px solid rgba(37,184,101,0.2)' }}>
                                    ♡ Normal
                                </div>
                                <RangeBar value={82} />
                                <p className="fs-11 text-muted mt-3 mb-0">
                                    <strong>Disclaimer:</strong> For non-medical use only. The measurement result in this product are for reference only and are not intended for any medical use.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Last 7 Trends */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Last 7 Times Trends</h5>
                                <div className="d-flex gap-2">
                                    <span className="badge bg-soft-danger text-danger">Min 67</span>
                                    <span className="badge bg-soft-danger text-danger">Max 100</span>
                                    <span className="badge bg-soft-danger text-danger">Avg 85</span>
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
                                <h5 className="card-title mb-0">HR Readings — History</h5>
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
                                        <span className="fs-14 fw-semibold text-danger">{h.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* HR Zones */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Heart Rate Zone</h5>
                            </div>
                            <div className="card-body">
                                <p className="fs-12 text-muted mb-4">
                                    Your heart rate is a powerful window into your overall well-being. By tracking your daily zones, you can better understand your body's rhythms from moments of deep recovery to periods of exertion.
                                </p>
                                {HR_ZONES.map(z => (
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

export default TimexHeartRateDetail
