import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import Footer from '@/components/shared/Footer'

const UNIT_ROWS = [
    { label: 'Distance unit',  desc: 'Steps, pace and route tracking', opts: ['Kilometres (km)', 'Miles (mi)'] },
    { label: 'Weight unit',    desc: '',                               opts: ['Kilograms (kg)', 'Pounds (lbs)'] },
    { label: 'Temperature',    desc: '',                               opts: ['Celsius (°C)', 'Fahrenheit (°F)'] },
    { label: 'Time format',    desc: '',                               opts: ['24 hour', '12 hour (AM/PM)'] },
    { label: 'Week starts on', desc: '',                               opts: ['Monday', 'Sunday'] },
]

const NOTIFICATIONS = [
    { label: 'Push notifications',   desc: 'All app alerts and reminders',    on: true },
    { label: 'Goal reached alerts',  desc: 'Steps and calorie goals',          on: true },
    { label: 'Inactivity reminder',  desc: 'Remind me to move after 60 min',  on: false },
    { label: 'High heart rate alert',desc: 'Alert above 120 bpm',             on: false },
]

const TimexSettings = () => (
    <>
        <PageHeader />
        <div className="main-content">
            <div className="row g-3">

                {/* Left column */}
                <div className="col-xxl-6 col-md-12">

                    {/* Profile card */}
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Profile</h5>
                            <button className="btn btn-light btn-sm">Edit</button>
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-3 pb-3 mb-3 border-bottom">
                                <div className="avatar-text avatar-lg bg-primary text-white fw-bold">YS</div>
                                <div>
                                    <h6 className="fw-bold text-dark mb-0">Yash Shah</h6>
                                    <p className="fs-12 text-muted mb-1">yash@gmail.com</p>
                                    <div className="d-flex gap-2">
                                        <span className="badge bg-soft-secondary text-secondary">175 cm</span>
                                        <span className="badge bg-soft-secondary text-secondary">67 kg</span>
                                        <span className="badge bg-soft-secondary text-secondary">21 yrs</span>
                                    </div>
                                </div>
                            </div>
                            {[
                                { label: 'Full name',     value: 'Yash Shah' },
                                { label: 'Date of birth', value: 'December 24, 1998' },
                                { label: 'Gender',        value: 'Male' },
                            ].map(row => (
                                <div key={row.label} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <span className="fs-13 text-muted">{row.label}</span>
                                    <span className="fs-13 fw-medium text-dark">{row.value}</span>
                                </div>
                            ))}
                            <div className="d-flex justify-content-between align-items-center pt-2">
                                <span className="fs-13 text-muted">Daily step goal</span>
                                <select className="form-select form-select-sm" style={{ width: 150 }}>
                                    <option>10,000 steps</option>
                                    <option>8,000 steps</option>
                                    <option>12,000 steps</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Units & Display card */}
                    <div className="card mb-0">
                        <div className="card-header">
                            <h5 className="card-title">Units &amp; Display</h5>
                        </div>
                        <div className="card-body">
                            {UNIT_ROWS.map(row => (
                                <div key={row.label} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <div>
                                        <span className="fs-13 fw-medium text-dark">{row.label}</span>
                                        {row.desc && <p className="fs-11 text-muted mb-0">{row.desc}</p>}
                                    </div>
                                    <select className="form-select form-select-sm" style={{ width: 160 }}>
                                        {row.opts.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right column */}
                <div className="col-xxl-6 col-md-12">

                    {/* Connected Device card */}
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Connected Device</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="avatar-text avatar-lg bg-soft-info text-info">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="9" />
                                    </svg>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="fw-bold text-dark mb-0">iConnect Calling Max</h6>
                                    <p className="fs-12 text-muted mb-2">00:00:00:00:00:00 · Paired</p>
                                    <div className="d-flex gap-4">
                                        <div>
                                            <div className="fs-13 fw-semibold text-success">Connected</div>
                                            <div className="fs-10 text-muted text-uppercase">Status</div>
                                        </div>
                                        <div>
                                            <div className="fs-13 fw-semibold text-dark">78%</div>
                                            <div className="fs-10 text-muted text-uppercase">Battery</div>
                                            <div className="progress mt-1" style={{ width: 60, height: 4 }}>
                                                <div className="progress-bar bg-success" style={{ width: '78%' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="fs-13 fw-semibold text-dark">2 min ago</div>
                                            <div className="fs-10 text-muted text-uppercase">Last Sync</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-light btn-sm flex-grow-1">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
                                        <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                                    </svg>
                                    Sync now
                                </button>
                                <button className="btn btn-soft-danger btn-sm flex-grow-1">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                    Disconnect
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications card */}
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Notifications</h5>
                        </div>
                        <div className="card-body">
                            {NOTIFICATIONS.map(n => (
                                <div key={n.label} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <div>
                                        <p className="fs-13 fw-medium text-dark mb-0">{n.label}</p>
                                        <p className="fs-11 text-muted mb-0">{n.desc}</p>
                                    </div>
                                    <div className="form-check form-switch mb-0">
                                        <input className="form-check-input" type="checkbox" defaultChecked={n.on} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Privacy & Security card */}
                    <div className="card mb-0">
                        <div className="card-header">
                            <h5 className="card-title">Privacy &amp; Security</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                <div>
                                    <p className="fs-13 fw-medium text-dark mb-0">Data sharing</p>
                                    <p className="fs-11 text-muted mb-0">Health data visibility</p>
                                </div>
                                <select className="form-select form-select-sm" style={{ width: 140 }}>
                                    <option>Private</option>
                                    <option>Friends only</option>
                                    <option>Public</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                <span className="fs-13 text-muted">App version</span>
                                <span className="fs-13 fw-medium text-dark" style={{ fontFamily: 'monospace' }}>v4.0.0</span>
                            </div>
                            <div className="d-flex gap-2 pt-3">
                                <button className="btn btn-light btn-sm flex-grow-1">Privacy Policy</button>
                                <button className="btn btn-light btn-sm flex-grow-1">Terms of Service</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Footer />
    </>
)

export default TimexSettings
