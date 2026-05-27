import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiFilter, FiMapPin } from 'react-icons/fi'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import TimexWorkoutItem from '@/components/timex/TimexWorkoutItem'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import Footer from '@/components/shared/Footer'
import { fetchWorkouts } from '@/store/slices/workoutSlice'
import {
    WORKOUT_TYPE_CONFIG,
    formatDistance,
    getAvgHeartRate,
    formatWorkoutMeta,
    groupWorkoutsByDate,
    formatGroupLabel,
} from '@/utils/workoutUtils'

const TimexWorkouts = () => {
    const dispatch = useDispatch()
    const { list, loading, error } = useSelector((state) => state.workouts)

    useEffect(() => {
        dispatch(fetchWorkouts())
    }, [dispatch])

    const groups = groupWorkoutsByDate(list)
    const todayCount = groups[0]?.workouts.length ?? 0

    return (
        <>
            <PageHeader />
            <div className="main-content">
                <div className="row g-3">
                    <div className="col-12">

                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div>
                                <h5 className="fw-bolder text-dark mb-0">Workout History</h5>
                                <p className="fs-12 text-muted mb-0">
                                    {todayCount} workout{todayCount !== 1 ? 's' : ''} today · {list.length} this week
                                </p>
                            </div>
                            {/* <div className="d-flex gap-2">
                                <button className="btn btn-light btn-sm d-flex align-items-center gap-1">
                                    <FiFilter size={13} /> Filter
                                </button>
                                <button className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                                    <FiMapPin size={13} /> Start GPS Workout
                                </button>
                            </div> */}
                        </div>

                        {loading && (
                            <SkeletonTheme baseColor="#f0f2f5" highlightColor="#e2e5ea">
                                <Skeleton height={11} width={120} className="mb-3" />
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="card mb-2">
                                        <div className="card-body py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <Skeleton width={44} height={44} borderRadius={8} />
                                                <div className="flex-grow-1">
                                                    <Skeleton height={13} width={110} className="mb-1" />
                                                    <Skeleton height={11} width={160} />
                                                </div>
                                                <div className="d-flex gap-4 d-none d-md-flex">
                                                    {[1, 2, 3].map(j => (
                                                        <div key={j} className="text-center">
                                                            <Skeleton height={14} width={48} className="mb-1" />
                                                            <Skeleton height={9} width={40} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <Skeleton width={10} height={18} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </SkeletonTheme>
                        )}

                        {error && (
                            <div className="alert alert-danger fs-12">{error}</div>
                        )}

                        {!loading && groups.map(({ date, workouts }) => (
                            <div key={date.toISOString()}>
                                <p className="fs-11 fw-semibold text-muted text-uppercase mb-2 mt-3">
                                    {formatGroupLabel(date)}
                                </p>
                                {workouts.map((workout) => {
                                    const config = WORKOUT_TYPE_CONFIG[workout.workout_type_name] ?? WORKOUT_TYPE_CONFIG.default
                                    const avgHR = getAvgHeartRate(workout.heart_rate)
                                    return (
                                        <TimexWorkoutItem
                                            key={workout.workout_id}
                                            icon={config.icon}
                                            iconBg={config.iconBg}
                                            iconBorder={config.iconBorder}
                                            type={workout.workout_type_name}
                                            gps={workout.route_points?.length > 0}
                                            meta={formatWorkoutMeta(workout.start_time, workout.duration_seconds)}
                                            workout={workout}
                                            stats={[
                                                {
                                                    value: formatDistance(workout.distance_meters, workout.distance_unit),
                                                    label: 'Distance',
                                                },
                                                {
                                                    value: workout.calories
                                                        ? Math.round(parseFloat(workout.calories)).toString()
                                                        : '—',
                                                    label: 'Calories',
                                                },
                                                {
                                                    value: avgHR ? `${avgHR} bpm` : '—',
                                                    label: 'Avg HR',
                                                },
                                            ]}
                                        />
                                    )
                                })}
                            </div>
                        ))}

                        {!loading && !error && list.length === 0 && (
                            <div className="text-center text-muted py-5 fs-13">No workouts found.</div>
                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TimexWorkouts
