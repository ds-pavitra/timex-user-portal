import React, { useState, useEffect } from 'react'
import { FiActivity, FiNavigation, FiZap, FiClock } from 'react-icons/fi'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import TimexMetricCard from '@/components/timex/TimexMetricCard'
import HourlyActivityChart from '@/components/timex/HourlyActivityChart'
import WeeklyStepsChart from '@/components/timex/WeeklyStepsChart'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import Footer from '@/components/shared/Footer'
import apiClient from '@/api/apiClient'
import { API_ENDPOINTS } from '@/api/config'

const ActivitySkeleton = () => (
    <SkeletonTheme baseColor="#f0f2f5" highlightColor="#e2e5ea">
        <div className="row g-3">
            {/* 4 metric cards */}
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="col-xxl-3 col-xl-3 col-md-6">
                    <div className="card stretch stretch-full">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <Skeleton height={10} width={70} />
                                <Skeleton circle width={20} height={20} />
                            </div>
                            <Skeleton height={32} width={110} className="mb-1" />
                            <Skeleton height={10} width={90} className="mb-3" />
                            <Skeleton height={4} borderRadius={2} />
                            <div className="d-flex justify-content-between mt-1">
                                <Skeleton height={9} width={20} />
                                <Skeleton height={9} width={70} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Hourly chart */}
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <Skeleton height={16} width={200} />
                        <Skeleton height={20} width={100} borderRadius={20} />
                    </div>
                    <div className="card-body pt-2">
                        <Skeleton height={200} borderRadius={8} />
                    </div>
                </div>
            </div>

            {/* Activity table */}
            <div className="col-xxl-6 col-md-12">
                <div className="card stretch stretch-full">
                    <div className="card-header">
                        <Skeleton height={16} width={160} />
                    </div>
                    <div className="card-body p-0">
                        <div className="px-4 py-2 d-flex gap-4 border-bottom">
                            {[80, 60, 80, 80].map((w, i) => <Skeleton key={i} height={10} width={w} />)}
                        </div>
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="px-4 py-3 d-flex align-items-center gap-4 border-bottom">
                                <Skeleton circle width={8} height={8} />
                                <Skeleton height={12} width={55} />
                                <Skeleton height={12} width={50} />
                                <Skeleton height={12} width={65} />
                                <Skeleton height={12} width={55} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Weekly chart */}
            <div className="col-xxl-6 col-md-12">
                <div className="card stretch stretch-full">
                    <div className="card-header">
                        <Skeleton height={16} width={180} />
                    </div>
                    <div className="card-body pt-2">
                        <Skeleton height={180} borderRadius={8} />
                        <div className="row g-3 mt-1 pt-3 border-top">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="col-4 text-center">
                                    <Skeleton height={20} width={80} className="mb-1" style={{ display: 'block', margin: '0 auto 4px' }} />
                                    <Skeleton height={9} width={60} style={{ display: 'block', margin: '0 auto' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SkeletonTheme>
)

const TODAY = new Date().toISOString().slice(0, 10)

const ROW_COLORS = ['#25b865', '#e49e3d', '#02a0e4', '#3454d1', '#9c27b0', '#f44336', '#ff9800']

const fmtDuration = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    return m > 0 ? `${h}:${String(m).padStart(2, '0')}` : `${h}:00`
}

const fmtDistance = (meters) => (Number(meters) / 1000).toFixed(2)

const clamp = (val) => Math.min(100, Math.max(0, val))

const TimexActivity = () => {
    const [summary, setSummary] = useState(null)
    const [intraday, setIntraday] = useState([])
    const [weekly, setWeekly] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [summaryRes, intradayRes, weeklyRes] = await Promise.all([
                    apiClient(`${API_ENDPOINTS.ACTIVITY.DAILY_SUMMARY}?date=${TODAY}`),
                    apiClient(`${API_ENDPOINTS.ACTIVITY.INTRADAY}?activity_date=${TODAY}`),
                    apiClient(`${API_ENDPOINTS.ACTIVITY.WEEKLY_SUMMARY}?date=${TODAY}`),
                ])
                setSummary(summaryRes.data)
                setIntraday(intradayRes.data)
                setWeekly(weeklyRes.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchAll()
    }, [])

    const steps = summary?.steps ?? 0
    const calories = Number(summary?.calories ?? 0)
    const distanceM = Number(summary?.distance ?? 0)
    const activeSec = summary?.active_duration ?? 0
    const stepsGoal = summary?.steps_goal ?? 10000
    const caloriesGoal = Number(summary?.calories_goal ?? 500)
    const distanceGoal = summary?.distance_goal ? Number(summary.distance_goal) : null

    const stepsProgress = clamp(Math.round((steps / stepsGoal) * 100))
    const caloriesProgress = clamp(Math.round((calories / caloriesGoal) * 100))
    const distanceProgress = distanceGoal ? clamp(Math.round((distanceM / distanceGoal) * 100)) : null

    const hourlySteps = summary?.intraday?.steps ?? Array(24).fill(0)

    const activeRows = intraday.filter(h => h.steps > 0)

    const weeklyDays = weekly?.daily ?? []
    const weeklyStepsGoal = weekly?.steps_goal ?? stepsGoal
    const goalDays = weeklyDays.filter(d => d.steps >= weeklyStepsGoal).length
    const totalKm = fmtDistance(weekly?.total_distance ?? 0)

    if (loading) {
        return (
            <>
                <PageHeader />
                <div className="main-content">
                    <ActivitySkeleton />
                </div>
                <Footer />
            </>
        )
    }

    if (error) {
        return (
            <>
                <PageHeader />
                <div className="main-content">
                    <div className="alert alert-danger">{error}</div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <PageHeader />
            <div className="main-content">
                <div className="row g-3">

                    {/* Row 1: 4 metric cards */}
                    <div className="col-xxl-3 col-xl-3 col-md-6">
                        <TimexMetricCard
                            label="Steps" value={steps.toLocaleString()}
                            change={`${stepsProgress}% of goal`} changeDir="up" color="green"
                            progress={stepsProgress} minLabel="0" goalLabel={`Goal: ${stepsGoal.toLocaleString()}`}
                            icon={<FiActivity size={16} />}
                        />
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-md-6">
                        <TimexMetricCard
                            label="Distance" value={fmtDistance(distanceM)} unit="km"
                            change={distanceGoal ? `${distanceProgress}% of goal` : 'No goal set'}
                            changeDir="up" color="cyan"
                            progress={distanceProgress ?? 0}
                            minLabel="0"
                            goalLabel={distanceGoal ? `Goal: ${fmtDistance(distanceGoal)} km` : '—'}
                            icon={<FiNavigation size={16} />}
                        />
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-md-6">
                        <TimexMetricCard
                            label="Calories" value={calories.toLocaleString()} unit="kcal"
                            change={`${caloriesProgress}% of goal`} changeDir="up" color="red"
                            progress={caloriesProgress} minLabel="0" goalLabel={`Goal: ${caloriesGoal.toLocaleString()} kcal`}
                            icon={<FiZap size={16} />}
                        />
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-md-6">
                        <TimexMetricCard
                            label="Active Time" value={fmtDuration(activeSec)} unit="hrs"
                            change="Today's active duration" changeDir="up" color="amber"
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
                                    <HourlyActivityChart stepsData={hourlySteps} />
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
                                                <th className="fs-11 text-muted fw-semibold ps-4">HOUR</th>
                                                <th className="fs-11 text-muted fw-semibold">STEPS</th>
                                                <th className="fs-11 text-muted fw-semibold">CALORIES</th>
                                                <th className="fs-11 text-muted fw-semibold pe-4">DISTANCE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activeRows.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="text-center text-muted fs-13 py-4">
                                                        No activity recorded today
                                                    </td>
                                                </tr>
                                            ) : (
                                                activeRows.map((row, idx) => (
                                                    <tr key={row.activity_id}>
                                                        <td className="fs-12 text-muted ps-4" style={{ fontFamily: 'monospace' }}>
                                                            <span className="d-inline-flex align-items-center gap-2">
                                                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: ROW_COLORS[idx % ROW_COLORS.length], display: 'inline-block' }} />
                                                                {String(row.hour).padStart(2, '0')}:00
                                                            </span>
                                                        </td>
                                                        <td className="fs-12" style={{ fontFamily: 'monospace' }}>{row.steps.toLocaleString()}</td>
                                                        <td className="fs-12 text-danger">{Number(row.calories).toLocaleString()} kcal</td>
                                                        <td className="fs-12 pe-4">{fmtDistance(row.distance_meters)} km</td>
                                                    </tr>
                                                ))
                                            )}
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
                                    <WeeklyStepsChart dailyData={weeklyDays} stepsGoal={weeklyStepsGoal} />
                                </div>
                                <div className="row g-3 mt-1 pt-3 border-top">
                                    <div className="col-4 text-center">
                                        <h5 className="fw-bolder text-dark mb-0">{(weekly?.total_steps ?? 0).toLocaleString()}</h5>
                                        <p className="fs-11 text-muted mb-0 text-uppercase">Total Steps</p>
                                    </div>
                                    <div className="col-4 text-center">
                                        <h5 className="fw-bolder text-success mb-0">{goalDays}/{weeklyDays.length || 7}</h5>
                                        <p className="fs-11 text-muted mb-0 text-uppercase">Goal Days</p>
                                    </div>
                                    <div className="col-4 text-center">
                                        <h5 className="fw-bolder text-info mb-0">{totalKm}</h5>
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
}

export default TimexActivity
