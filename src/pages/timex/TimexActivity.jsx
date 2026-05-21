import React from 'react'
import { FiActivity, FiNavigation, FiZap, FiClock } from 'react-icons/fi'
import TimexMetricCard from '@/components/timex/TimexMetricCard'
import HourlyActivityChart from '@/components/timex/HourlyActivityChart'
import WeeklyStepsChart from '@/components/timex/WeeklyStepsChart'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import Footer from '@/components/shared/Footer'

const ACTIVITIES = [
    { time: '08:00', type: 'Walk',  steps: '2,340', calories: '320 kcal', distance: '1.8 km', color: '#25b865' },
    { time: '11:00', type: 'Run',   steps: '1,850', calories: '280 kcal', distance: '1.4 km', color: '#e49e3d' },
    { time: '14:30', type: 'Walk',  steps: '1,200', calories: '160 kcal', distance: '0.9 km', color: '#02a0e4' },
    { time: '17:00', type: 'Cycle', steps: '1,131', calories: '200 kcal', distance: '0.1 km', color: '#3454d1' },
]

const TimexActivity = () => (
    <>
        <PageHeader />
        <div className="main-content">
            <div className="row g-3">

                {/* Row 1: 4 metric cards */}
                <div className="col-xxl-3 col-xl-3 col-md-6">
                    <TimexMetricCard
                        label="Steps" value="6,521"
                        change="65% of goal" changeDir="up" color="green"
                        progress={65} minLabel="0" goalLabel="Goal: 10,000"
                        icon={<FiActivity size={16} />}
                    />
                </div>
                <div className="col-xxl-3 col-xl-3 col-md-6">
                    <TimexMetricCard
                        label="Distance" value="4.2" unit="km"
                        change="On track" changeDir="up" color="cyan"
                        progress={60} minLabel="0" goalLabel="Goal: 7 km"
                        icon={<FiNavigation size={16} />}
                    />
                </div>
                <div className="col-xxl-3 col-xl-3 col-md-6">
                    <TimexMetricCard
                        label="Calories" value="2,967" unit="kcal"
                        change="85% of goal" changeDir="up" color="red"
                        progress={85} minLabel="0" goalLabel="Goal: 3,500"
                        icon={<FiZap size={16} />}
                    />
                </div>
                <div className="col-xxl-3 col-xl-3 col-md-6">
                    <TimexMetricCard
                        label="Active Time" value="2:45" unit="hrs"
                        change="Goal met" changeDir="up" color="amber"
                        progress={92} minLabel="0" goalLabel="Goal: 3 hrs"
                        icon={<FiClock size={16} />}
                    />
                </div>

                {/* Row 2: Hourly activity chart */}
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Hourly Activity — Today</h5>
                            <span className="badge bg-soft-info text-info">Steps per hour</span>
                        </div>
                        <div className="card-body d-flex flex-column pt-2">
                            <div style={{ flex: 1, minHeight: 200 }}>
                                <HourlyActivityChart />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 3: Activity table + Weekly chart */}
                <div className="col-xxl-6 col-md-12">
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Activity Breakdown</h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="fs-11 text-muted fw-semibold ps-4">TIME</th>
                                            <th className="fs-11 text-muted fw-semibold">ACTIVITY</th>
                                            <th className="fs-11 text-muted fw-semibold">STEPS</th>
                                            <th className="fs-11 text-muted fw-semibold">CALORIES</th>
                                            <th className="fs-11 text-muted fw-semibold pe-4">DISTANCE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ACTIVITIES.map(a => (
                                            <tr key={a.time}>
                                                <td className="fs-12 text-muted ps-4" style={{ fontFamily: 'monospace' }}>{a.time}</td>
                                                <td>
                                                    <span className="d-inline-flex align-items-center gap-2">
                                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, display: 'inline-block' }} />
                                                        <span className="fs-13 fw-medium text-dark">{a.type}</span>
                                                    </span>
                                                </td>
                                                <td className="fs-12" style={{ fontFamily: 'monospace' }}>{a.steps}</td>
                                                <td className="fs-12 text-danger">{a.calories}</td>
                                                <td className="fs-12 pe-4">{a.distance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-6 col-md-12">
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Weekly Steps Progress</h5>
                        </div>
                        <div className="card-body d-flex flex-column pt-2">
                            <div style={{ flex: 1, minHeight: 180 }}>
                                <WeeklyStepsChart />
                            </div>
                            <div className="row g-3 mt-1 pt-3 border-top">
                                <div className="col-4 text-center">
                                    <h5 className="fw-bolder text-dark mb-0">45,260</h5>
                                    <p className="fs-11 text-muted mb-0 text-uppercase">Total Steps</p>
                                </div>
                                <div className="col-4 text-center">
                                    <h5 className="fw-bolder text-success mb-0">5/7</h5>
                                    <p className="fs-11 text-muted mb-0 text-uppercase">Goal Days</p>
                                </div>
                                <div className="col-4 text-center">
                                    <h5 className="fw-bolder text-info mb-0">29.4</h5>
                                    <p className="fs-11 text-muted mb-0 text-uppercase">KM Covered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <Footer />
    </>
)

export default TimexActivity
