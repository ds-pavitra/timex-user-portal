import React from 'react'
import { FiFilter, FiMapPin } from 'react-icons/fi'
import TimexWorkoutItem from '@/components/timex/TimexWorkoutItem'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import Footer from '@/components/shared/Footer'

const walkIconCyan = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#02a0e4" strokeWidth="2">
        <circle cx="12" cy="5" r="2" /><path d="M12 12v7M9 9l3 3 3-3" />
    </svg>
)
const runIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e49e3d" strokeWidth="2">
        <circle cx="12" cy="5" r="2" /><path d="M5 22v-5l3-5 4 3 4-3 3 5v5M9 12l1 3" />
    </svg>
)
const tennisIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d13b4c" strokeWidth="2">
        <circle cx="12" cy="5" r="2" /><path d="M5 22v-5l3-5 4 3 4-3 3 5v5" />
    </svg>
)
const yogaIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3454d1" strokeWidth="2">
        <circle cx="12" cy="5" r="2" /><path d="M12 12v7M9 9l3 3 3-3" />
    </svg>
)
const walkIconGreen = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25b865" strokeWidth="2">
        <circle cx="12" cy="5" r="2" /><path d="M12 12v7M9 9l3 3 3-3" />
    </svg>
)

const TimexWorkouts = () => (
    <>
        <PageHeader />
        <div className="main-content">
            <div className="row g-3">
                <div className="col-12">

                    {/* Header row */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                            <h5 className="fw-bolder text-dark mb-0">Workout History</h5>
                            <p className="fs-12 text-muted mb-0">3 workouts today · 14 this week</p>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-light btn-sm d-flex align-items-center gap-1">
                                <FiFilter size={13} /> Filter
                            </button>
                            <button className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                                <FiMapPin size={13} /> Start GPS Workout
                            </button>
                        </div>
                    </div>

                    {/* Today */}
                    <p className="fs-11 fw-semibold text-muted text-uppercase mb-2">Today · Wed 18 Mar</p>

                    <TimexWorkoutItem
                        icon={walkIconCyan}
                        iconBg="rgba(2,160,228,0.1)" iconBorder="rgba(2,160,228,0.2)"
                        type="GPS Walk" gps
                        meta="Today at 8:00 AM · 24 min 37 sec"
                        stats={[
                            { value: '2.4 km', label: 'Distance' },
                            { value: '312',    label: 'Calories' },
                            { value: '118 bpm',label: 'Avg HR' },
                        ]}
                    />
                    <TimexWorkoutItem
                        icon={runIcon}
                        iconBg="rgba(228,158,61,0.1)" iconBorder="rgba(228,158,61,0.2)"
                        type="Running"
                        meta="Today at 11:00 AM · 30 min"
                        stats={[
                            { value: '4.2 km', label: 'Distance' },
                            { value: '480',    label: 'Calories' },
                            { value: '142 bpm',label: 'Avg HR' },
                        ]}
                    />
                    <TimexWorkoutItem
                        icon={tennisIcon}
                        iconBg="rgba(209,59,76,0.1)" iconBorder="rgba(209,59,76,0.2)"
                        type="Tennis"
                        meta="Today at 1:00 PM · 30 min"
                        stats={[
                            { value: '3,521', label: 'Steps' },
                            { value: '1,000', label: 'Calories' },
                            { value: '90 bpm',label: 'Avg HR' },
                        ]}
                    />

                    {/* Yesterday */}
                    <p className="fs-11 fw-semibold text-muted text-uppercase mb-2 mt-3">Yesterday · Tue 17 Mar</p>

                    <TimexWorkoutItem
                        icon={yogaIcon}
                        iconBg="rgba(52,84,209,0.1)" iconBorder="rgba(52,84,209,0.2)"
                        type="Yoga"
                        meta="Yesterday at 8:00 AM · 1h"
                        stats={[
                            { value: '—',     label: 'Distance' },
                            { value: '1,000', label: 'Calories' },
                            { value: '90 bpm',label: 'Avg HR' },
                        ]}
                    />
                    <TimexWorkoutItem
                        icon={walkIconGreen}
                        iconBg="rgba(37,184,101,0.1)" iconBorder="rgba(37,184,101,0.2)"
                        type="GPS Walk" gps
                        meta="Yesterday at 6:00 PM · 45 min"
                        stats={[
                            { value: '3.8 km', label: 'Distance' },
                            { value: '420',    label: 'Calories' },
                            { value: '108 bpm',label: 'Avg HR' },
                        ]}
                    />

                </div>
            </div>
        </div>
        <Footer />
    </>
)

export default TimexWorkouts
