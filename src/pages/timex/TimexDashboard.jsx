import React from 'react'
import { FiHeart, FiActivity, FiMoon, FiZap, FiDroplet } from 'react-icons/fi'
import TimexMetricCard from '@/components/timex/TimexMetricCard'
import TimexSleepCard from '@/components/timex/TimexSleepCard'
import TimexStressZonesCard from '@/components/timex/TimexStressZonesCard'
import HeartRateChart from '@/components/timex/HeartRateChart'
import StepsTimelineChart from '@/components/timex/StepsTimelineChart'
import CaloriesDonutChart from '@/components/timex/CaloriesDonutChart'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import Footer from '@/components/shared/Footer'

const SleepMiniBar = () => (
    <div className="mt-2">
        <div className="d-flex gap-1" style={{ height: 5 }}>
            <div style={{ flex: 1, background: '#64748b', borderRadius: 2 }} />
            <div style={{ flex: 3, background: '#25b865', borderRadius: 2 }} />
            <div style={{ flex: 4, background: '#3454d1', borderRadius: 2 }} />
            <div style={{ flex: 5, background: '#02a0e4', borderRadius: 2 }} />
        </div>
        <p className="fs-10 text-muted mt-1 mb-0">Awake · Light · Deep · REM</p>
    </div>
)

const StressGradientBar = () => (
    <div className="mt-2">
        <div style={{ width: '100%', height: 8, borderRadius: 4, position: 'relative', background: 'linear-gradient(90deg,#25b865 0%,#e49e3d 50%,#d13b4c 100%)' }}>
            <div style={{ position: 'absolute', left: '30%', top: -2, width: 2, height: 12, background: '#283c50', borderRadius: 1 }} />
        </div>
        <div className="d-flex justify-content-between fs-10 text-muted mt-1">
            <span>Relaxed</span><span>Normal</span><span>High</span>
        </div>
    </div>
)

const TimexDashboard = () => (
    <>
        <PageHeader />
        <div className="main-content">
            <div className="row g-3">

                {/* Row 1: 4 metric cards */}
                <div className="col-xxl-3 col-xl-3 col-md-6">
                    <TimexMetricCard
                        label="Heart Rate" value="82" unit="bpm"
                        change="Normal range" changeDir="up" color="red"
                        progress={55} minLabel="60 bpm" goalLabel="Max 120 bpm"
                        icon={<FiHeart size={16} />}
                    />
                </div>
                <div className="col-xxl-3 col-xl-3 col-md-6">
                    <TimexMetricCard
                        label="Steps Today" value="6,521" unit="steps"
                        change="65% of goal" changeDir="up" color="green"
                        progress={65} minLabel="0" goalLabel="Goal: 10,000"
                        icon={<FiActivity size={16} />}
                    />
                </div>
                <div className="col-xxl-3 col-xl-3 col-md-6">
                    <TimexMetricCard
                        label="Last Night" value="6:30" unit="hrs"
                        change="Below ideal (8h)" changeDir="down" color="purple"
                        icon={<FiMoon size={16} />}
                    >
                        <SleepMiniBar />
                    </TimexMetricCard>
                </div>
                <div className="col-xxl-3 col-xl-3 col-md-6">
                    <TimexMetricCard
                        label="Stress Level" value="30" unit="/ 100"
                        change="Relaxed" changeDir="up" color="amber"
                        icon={<FiZap size={16} />}
                    >
                        <StressGradientBar />
                    </TimexMetricCard>
                </div>

                {/* Row 2: Blood Oxygen + Blood Pressure */}
                <div className="col-xxl-6 col-md-6">
                    <TimexMetricCard
                        label="Blood Oxygen" value="75" unit="%"
                        color="cyan" icon={<FiDroplet size={16} />}
                        timestamp="11:20 AM"
                    />
                </div>
                <div className="col-xxl-6 col-md-6">
                    <TimexMetricCard
                        label="Blood Pressure" value="121/79" unit="mmHg"
                        color="purple" icon={<FiActivity size={16} />}
                        timestamp="Jan 12"
                    />
                </div>

                {/* Row 3: HR chart + Sleep */}
                <div className="col-xxl-8 col-md-12">
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Heart Rate Today</h5>
                            <div className="d-flex gap-2 flex-wrap">
                                <span className="badge bg-soft-danger text-danger">Min 58 bpm</span>
                                <span className="badge bg-soft-danger text-danger">Max 124 bpm</span>
                                <span className="badge bg-soft-danger text-danger">Avg 82 bpm</span>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column pt-2">
                            <div style={{ flex: 1, minHeight: 200 }}>
                                <HeartRateChart />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-md-12">
                    <TimexSleepCard />
                </div>

                {/* Row 3: Steps + Stress zones + Calories */}
                <div className="col-xxl-6 col-md-12">
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Steps Timeline</h5>
                            <span className="badge bg-soft-success text-success">6,521 / 10,000</span>
                        </div>
                        <div className="card-body d-flex flex-column pt-2">
                            <div style={{ flex: 1, minHeight: 160 }}>
                                <StepsTimelineChart />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-md-6">
                    <TimexStressZonesCard />
                </div>
                <div className="col-xxl-3 col-md-6">
                    <div className="card stretch stretch-full">
                        <div className="card-header">
                            <h5 className="card-title">Calories</h5>
                        </div>
                        <div className="card-body text-center d-flex flex-column justify-content-center">
                            <div style={{ maxWidth: 120, margin: '0 auto' }}>
                                <CaloriesDonutChart />
                            </div>
                            <h3 className="fw-bolder text-danger mt-2 mb-0">2,967</h3>
                            <p className="fs-12 text-muted">of 3,500 kcal goal</p>
                            <div className="progress" style={{ height: 6 }}>
                                <div className="progress-bar bg-danger" style={{ width: '85%' }} />
                            </div>
                            <p className="fs-11 text-muted mt-1 mb-0">533 kcal remaining</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <Footer />
    </>
)

export default TimexDashboard
