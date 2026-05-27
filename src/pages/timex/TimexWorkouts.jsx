import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiFilter, FiMapPin } from 'react-icons/fi'
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
                            <div className="text-center py-5">
                                <div className="spinner-border spinner-border-sm text-primary" />
                            </div>
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
