import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiActivity } from 'react-icons/fi'
import ReactApexChart from 'react-apexcharts'
import Footer from '@/components/shared/Footer'

const trendOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#3454d1'],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
    xaxis: {
        categories: ['121/79', '130/85', '120/80', '115/75', '140/80', '125/82', '135/88'],
        axisBorder: { show: false }, axisTicks: { show: false },
        labels: { style: { colors: '#91a1b6', fontSize: '9px' } }
    },
    yaxis: { min: 80, max: 160, labels: { style: { colors: '#91a1b6', fontSize: '10px' } } },
    grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 3, padding: { left: 4, right: 4 } },
    tooltip: { theme: 'light', style: { fontSize: '11px' }, y: { formatter: v => `${v} mmHg` } },
    dataLabels: { enabled: false },
    legend: { show: false },
}
const trendSeries = [{ name: 'Systolic', data: [121, 130, 120, 115, 140, 125, 135] }]

const HISTORY = [
    { date: '30 Jan 2025  3:00 PM', value: '135/88 mmHg' },
    { date: '30 Jan 2025  3:00 PM', value: '125/82 mmHg' },
    { date: '30 Jan 2025  4:27 PM', value: '140/90 mmHg' },
]

const BP_ZONES = [
    {
        label: 'Low', range: 'Below 90/60 mmHg', color: '#02a0e4',
        insight: 'The pressure against your artery walls is reduced. While this can be completely normal, it can occasionally cause lightheadedness.',
        when: 'Dehydration, prolonged rest, or standing up too quickly.',
    },
    {
        label: 'Optimal', range: '90/60–119/79 mmHg', color: '#25b865',
        insight: 'Your blood is flowing beautifully, minimising strain on your heart and vascular system to promote excellent long-term health.',
        when: 'Maintaining a balanced lifestyle with regular movement and healthy habits.',
    },
    {
        label: 'Normal', range: '120/80–129/84 mmHg', color: '#25b865',
        insight: 'Your pressure is slightly elevated but remains within a safe, functional baseline.',
        when: 'Natural daily stress, slight dietary imbalances, or navigating a busy day.',
    },
    {
        label: 'Elevated', range: '130/85–139/89 mmHg', color: '#e49e3d',
        insight: 'Your heart and arteries are experiencing sustained, increased strain. Small, proactive adjustments can make a big difference here.',
        when: 'Periods of chronic stress, high sodium intake, or a lack of physical activity.',
    },
    {
        label: 'High', range: '140/90+ mmHg', color: '#d13b4c',
        insight: 'Your cardiovascular system is working under significant pressure. Partnering with a healthcare provider is a great step to manage these numbers.',
        when: 'Unmanaged chronic hypertension or severe acute stress.',
    },
]

const RangeBar = ({ systolic = 121 }) => {
    const pct = Math.min(100, Math.max(0, ((systolic - 90) / 60) * 100))
    return (
        <div style={{ paddingTop: 28, paddingBottom: 4 }}>
            <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, bottom: '100%', fontSize: 10, fontWeight: 600, color: '#02a0e4', marginBottom: 4 }}>Low</span>
                <span style={{ position: 'absolute', right: 0, bottom: '100%', fontSize: 10, fontWeight: 600, color: '#d13b4c', marginBottom: 4 }}>High</span>
                <div style={{
                    position: 'absolute', left: `${pct}%`, bottom: '100%',
                    transform: 'translateX(-50%)', marginBottom: 4, textAlign: 'center'
                }}>
                    <span className="fs-11 fw-bold text-dark">121/79</span>
                </div>
                <div style={{
                    width: '100%', height: 10, borderRadius: 5,
                    background: 'linear-gradient(90deg,#02a0e4 0%,#25b865 35%,#e49e3d 65%,#d13b4c 100%)',
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
                <span>90/60</span><span>120/80</span><span>140/90</span>
            </div>
        </div>
    )
}

const TimexBloodPressureDetail = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="page-header">
                <div className="page-header-left d-flex align-items-center gap-3">
                    <button className="btn btn-light btn-sm d-flex align-items-center gap-1" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={14} /> Back
                    </button>
                    <div>
                        <h5 className="fw-bold text-dark mb-0">Blood Pressure</h5>
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
                                        <span className="fw-bolder text-primary" style={{ fontSize: 42 }}>121/79</span>
                                        <span className="fs-13 text-muted">mmHg</span>
                                    </div>
                                    <FiActivity size={36} className="text-primary opacity-25" />
                                </div>
                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <div className="p-2 rounded text-center" style={{ background: 'rgba(52,84,209,0.08)' }}>
                                            <p className="fs-11 text-muted mb-1">Systolic</p>
                                            <span className="fs-16 fw-bolder text-primary">121</span>
                                            <span className="fs-11 text-muted ms-1">mmHg</span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="p-2 rounded text-center" style={{ background: 'rgba(52,84,209,0.08)' }}>
                                            <p className="fs-11 text-muted mb-1">Diastolic</p>
                                            <span className="fs-16 fw-bolder text-primary">79</span>
                                            <span className="fs-11 text-muted ms-1">mmHg</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="fs-12 text-muted mb-2">Your Blood Pressure range is:</p>
                                <div className="py-2 px-3 rounded text-center fw-semibold fs-13 text-success"
                                    style={{ background: 'rgba(37,184,101,0.12)', border: '1px solid rgba(37,184,101,0.2)' }}>
                                    ♡ Normal
                                </div>
                                <RangeBar systolic={121} />
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
                                    <span className="badge bg-soft-primary text-primary">Min 115</span>
                                    <span className="badge bg-soft-primary text-primary">Max 140</span>
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
                                <h5 className="card-title mb-0">BP Readings — History</h5>
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

                    {/* BP Zones */}
                    <div className="col-12 col-md-6">
                        <div className="card stretch stretch-full">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Blood Pressure Zones</h5>
                            </div>
                            <div className="card-body">
                                <p className="fs-12 text-muted mb-4">
                                    Blood pressure measures the gentle force of blood moving through your arteries. Keeping your numbers within healthy ranges is one of the best ways to protect your blood vessels and support your long-term cardiovascular health.
                                </p>
                                {BP_ZONES.map(z => (
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

export default TimexBloodPressureDetail
