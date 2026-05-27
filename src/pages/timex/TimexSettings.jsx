import React, { useState, useEffect } from 'react'
import {
    FiUser, FiMapPin, FiPhone, FiCalendar, FiSmartphone,
    FiTarget, FiActivity, FiZap, FiTrendingUp, FiMail,
    FiGlobe, FiCheckCircle,
} from 'react-icons/fi'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import Footer from '@/components/shared/Footer'
import apiClient from '@/api/apiClient'
import { API_ENDPOINTS } from '@/api/config'

/* ─── Goal Ring (SVG donut) ─────────────────────────────────────── */
const GoalRing = ({ value, unit, label, color }) => {
    const r = 34
    const circ = 2 * Math.PI * r
    return (
        <div className="d-flex flex-column align-items-center">
            <div style={{ position: 'relative', width: 88, height: 88 }}>
                <svg width="88" height="88" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="7" />
                    <circle
                        cx="44" cy="44" r={r} fill="none" stroke={color}
                        strokeWidth="7"
                        strokeDasharray={`${circ * 0.82} ${circ * 0.18}`}
                        strokeLinecap="round"
                        transform="rotate(-90 44 44)"
                        style={{ filter: `drop-shadow(0 0 5px ${color}55)` }}
                    />
                </svg>
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#283c50', lineHeight: 1.1 }}>
                        {Number(value).toLocaleString()}
                    </span>
                    <span style={{ fontSize: 9, color: '#91a1b6', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        {unit}
                    </span>
                </div>
            </div>
            <p className="fs-11 text-muted mt-2 mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.4px' }}>
                {label}
            </p>
        </div>
    )
}

/* ─── BMI Scale Bar ──────────────────────────────────────────────── */
const BmiScale = ({ value, category }) => {
    const pct = Math.min(100, Math.max(0, ((Number(value) - 10) / 30) * 100))
    const colorMap = { Underweight: '#02a0e4', Normal: '#25b865', Overweight: '#e49e3d', Obese: '#d13b4c' }
    const markerColor = colorMap[category] ?? '#25b865'
    return (
        <div style={{ paddingTop: 22, paddingBottom: 2 }}>
            <div style={{ position: 'relative' }}>
                <div style={{
                    position: 'absolute', left: `${pct}%`,
                    bottom: '100%', transform: 'translateX(-50%)', marginBottom: 4, textAlign: 'center',
                }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: markerColor }}>{value}</span>
                </div>
                <div style={{
                    width: '100%', height: 10, borderRadius: 6,
                    background: 'linear-gradient(90deg, #02a0e4 0%, #25b865 38%, #e49e3d 68%, #d13b4c 100%)',
                    position: 'relative',
                }}>
                    <div style={{
                        position: 'absolute', left: `${pct}%`, top: -4,
                        transform: 'translateX(-50%)',
                        width: 3, height: 18,
                        background: '#fff',
                        border: `2px solid ${markerColor}`,
                        borderRadius: 2,
                        boxShadow: `0 0 6px ${markerColor}88`,
                    }} />
                </div>
            </div>
            <div className="d-flex justify-content-between fs-10 text-muted mt-2">
                <span>&lt;18.5</span><span>18.5</span><span>25</span><span>30+</span>
            </div>
            <div className="d-flex justify-content-between fs-10 mt-1" style={{ color: '#b0bec5' }}>
                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
            </div>
        </div>
    )
}

/* ─── Info Row ───────────────────────────────────────────────────── */
const InfoRow = ({ icon, label, value, last }) => (
    <div className={`d-flex align-items-center gap-3 py-2 ${!last ? 'border-bottom' : ''}`}>
        <span className="text-info" style={{ width: 16, flexShrink: 0 }}>{icon}</span>
        <span className="fs-12 text-muted" style={{ minWidth: 108 }}>{label}</span>
        <span className="fs-13 fw-medium text-dark ms-auto text-end">{value || '—'}</span>
    </div>
)

/* ─── Stat Chip ──────────────────────────────────────────────────── */
const StatChip = ({ label, value, color }) => (
    <div style={{
        borderLeft: `3px solid ${color}`,
        background: `${color}14`,
        borderRadius: '8px',
        padding: '8px 14px',
        minWidth: 72,
    }}>
        <div style={{ fontSize: 17, fontWeight: 700, color, lineHeight: 1.15 }}>{value}</div>
        <div style={{ fontSize: 10, color: '#91a1b6', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>
            {label}
        </div>
    </div>
)

/* ─── Metric Tile (body metrics) ─────────────────────────────────── */
const MetricTile = ({ label, value, unit, subValue, color, icon }) => (
    <div className="d-flex align-items-center justify-content-between p-3 mb-2 rounded" style={{
        background: `${color}0d`,
        border: `1px solid ${color}22`,
    }}>
        <div>
            <p className="fs-11 text-muted text-uppercase fw-semibold mb-0" style={{ letterSpacing: '0.4px' }}>{label}</p>
            <h4 className="fw-bolder mb-0 mt-1" style={{ color }}>
                {value || '—'}
                {unit && <small className="fs-12 fw-normal text-muted ms-1">{unit}</small>}
            </h4>
            {subValue && value ? (
                <span className="fs-11 text-muted">{subValue}</span>
            ) : null}
        </div>
        <div style={{
            width: 42, height: 42, borderRadius: '50%',
            background: `${color}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
        }}>
            {icon}
        </div>
    </div>
)

/* ─── Helpers ────────────────────────────────────────────────────── */
const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '—'
const titleCase = (s) => s ? s.replace(/\b\w/g, c => c.toUpperCase()) : ''

const fmtDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

const calcAge = (dob) => {
    if (!dob) return null
    return Math.floor((new Date() - new Date(dob)) / (365.25 * 24 * 3600 * 1000))
}

/* ══════════════════════════════════════════════════════════════════ */
const TimexSettings = () => {
    const [demographics, setDemographics] = useState(null)
    const [health, setHealth] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [demoRes, healthRes] = await Promise.all([
                    apiClient(API_ENDPOINTS.PROFILE.DEMOGRAPHICS),
                    apiClient(API_ENDPOINTS.PROFILE.HEALTH),
                ])
                setDemographics(demoRes.data)
                setHealth(healthRes.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchAll()
    }, [])

    if (loading) {
        return (
            <>
                <PageHeader />
                <div className="main-content d-flex align-items-center justify-content-center" style={{ minHeight: 320 }}>
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading…</span>
                    </div>
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

    /* ── Derived data ──────────────────────────────────────────────── */
    const user = demographics?.user ?? {}
    const profile = demographics?.profile ?? {}
    const demographic = demographics?.demographic ?? {}
    const biological = health?.biological ?? {}
    const goals = health?.goals ?? []
    const derivedMetrics = health?.derived_metrics ?? []

    const firstName = titleCase(profile.first_name ?? '')
    const lastName = titleCase(profile.last_name ?? '')
    const fullName = `${firstName} ${lastName}`.trim() || 'User'
    const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || 'U'
    const hasBiological = !!(biological?.height_cm || biological?.weight_kg)

    const age = calcAge(demographic.dob)
    const bmiData = derivedMetrics.find(m => m.metric_type === 'BMI')
    const bmrData = derivedMetrics.find(m => m.metric_type === 'BMR')
    const stepsGoal = goals.find(g => g.goal_type === 'steps')
    const caloriesGoal = goals.find(g => g.goal_type === 'calories')

    const bmiValue = parseFloat(bmiData?.value ?? 0)
    const bmiCategory = bmiData?.category ?? 'Normal'
    const bmiColorMap = { Underweight: '#02a0e4', Normal: '#25b865', Overweight: '#e49e3d', Obese: '#d13b4c' }
    const bmiColor = bmiColorMap[bmiCategory] ?? '#25b865'

    return (
        <>
            <PageHeader />
            <div className="main-content">
                <div className="row g-3 pb-5">

                    {/* ══ HERO BANNER ═══════════════════════════════════════════ */}
                    <div className="col-12">
                        <div className="card overflow-hidden mb-0">
                            {/* Gradient banner */}
                            <div style={{
                                height: 60,
                                position: 'relative',
                            }}>
                                {/* decorative circles */}
                                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                                <div style={{ position: 'absolute', top: 10, right: 60, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                                <div style={{ position: 'absolute', bottom: -20, left: 200, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                            </div>

                            <div className="card-body" style={{ paddingTop: 0 }}>
                                <div className="d-flex align-items-end gap-3 flex-wrap" style={{ marginTop: -46 }}>
                                    {/* Avatar */}
                                    <div style={{
                                        width: 92, height: 92, borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #3454d1, #02a0e4)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontSize: 32, fontWeight: 700,
                                        border: '4px solid #fff',
                                        boxShadow: '0 6px 20px rgba(2,160,228,0.35)',
                                        flexShrink: 0, letterSpacing: 1,
                                    }}>
                                        {initials}
                                    </div>

                                    {/* Name & meta */}
                                    <div className="pb-1" style={{ minWidth: 0, flex: '1 1 200px' }}>
                                        <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
                                            <h4 className="fw-bolder text-dark mb-0">{fullName}</h4>
                                            {user.status && (
                                                <span className="badge bg-soft-success text-success">{capitalize(user.status)}</span>
                                            )}
                                            {user.os && (
                                                <span className="badge bg-soft-info text-info">{user.os}</span>
                                            )}
                                        </div>
                                        <div className="d-flex flex-wrap gap-3 mt-1">
                                            {user.email && (
                                                <span className="d-flex align-items-center gap-1 fs-12 text-muted">
                                                    <FiMail size={11} /> {user.email}
                                                </span>
                                            )}
                                            {demographic.city && (
                                                <span className="d-flex align-items-center gap-1 fs-12 text-muted">
                                                    <FiMapPin size={11} /> {demographic.city}, {demographic.country}
                                                </span>
                                            )}
                                            {user.phone && (
                                                <span className="d-flex align-items-center gap-1 fs-12 text-muted">
                                                    <FiPhone size={11} /> {user.phone}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quick-stat chips */}
                                    <div className="d-flex flex-wrap gap-2 pb-1" style={{ marginLeft: 'auto' }}>
                                        {age !== null && (
                                            <StatChip label="Age" value={`${age} yrs`} color="#3454d1" />
                                        )}
                                        {biological.height_cm && (
                                            <StatChip label="Height" value={`${parseFloat(biological.height_cm)} ${biological.height_unit}`} color="#02a0e4" />
                                        )}
                                        {biological.weight_kg && (
                                            <StatChip label="Weight" value={`${parseFloat(biological.weight_kg)} ${biological.weight_unit}`} color="#25b865" />
                                        )}
                                        {bmiData && bmiValue > 0 && (
                                            <StatChip label="BMI" value={bmiValue.toFixed(1)} color={bmiColor} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ══ PERSONAL INFO ═════════════════════════════════════════ */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card stretch stretch-full mb-0">
                            <div className="card-header">
                                <h5 className="card-title d-flex align-items-center gap-2">
                                    <FiUser size={14} className="text-info" /> Personal Info
                                </h5>
                            </div>
                            <div className="card-body">
                                <InfoRow icon={<FiUser size={13} />}       label="Full Name"     value={fullName} />
                                <InfoRow icon={<FiCalendar size={13} />}   label="Date of Birth" value={fmtDate(demographic.dob)} />
                                <InfoRow icon={<FiUser size={13} />}       label="Age"           value={age !== null ? `${age} years` : null} />
                                <InfoRow icon={<FiUser size={13} />}       label="Gender"        value={capitalize(demographic.gender)} />
                                <InfoRow icon={<FiPhone size={13} />}      label="Phone"         value={user.phone} />
                                <InfoRow icon={<FiSmartphone size={13} />} label="Device OS"     value={user.os} />
                                <InfoRow icon={<FiMapPin size={13} />}     label="City"          value={demographic.city} />
                                <InfoRow icon={<FiMapPin size={13} />}     label="Region"        value={demographic.region} />
                                <InfoRow icon={<FiGlobe size={13} />}      label="Country"       value={demographic.country} last />
                            </div>
                        </div>
                    </div>

                    {/* ══ BODY METRICS ══════════════════════════════════════════ */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card stretch stretch-full mb-0">
                            <div className="card-header">
                                <h5 className="card-title d-flex align-items-center gap-2">
                                    <FiActivity size={14} className="text-success" /> Body Metrics
                                </h5>
                            </div>
                            <div className="card-body">
                                {hasBiological ? (
                                    <>
                                        <MetricTile
                                            label="Height"
                                            value={parseFloat(biological.height_cm)}
                                            unit={biological.height_unit ?? 'cm'}
                                            subValue={biological.height_unit !== 'cm' ? null : `${biological.height_feet}′${biological.height_inches}″`}
                                            color="#02a0e4"
                                            icon={
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#02a0e4" strokeWidth="2">
                                                    <path d="M12 2v20M7 7l5-5 5 5M7 17l5 5 5-5" />
                                                </svg>
                                            }
                                        />
                                        <MetricTile
                                            label="Weight"
                                            value={parseFloat(biological.weight_kg)}
                                            unit={biological.weight_unit ?? 'kg'}
                                            subValue={`${biological.weight_lbs} lbs`}
                                            color="#25b865"
                                            icon={
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25b865" strokeWidth="2">
                                                    <path d="M6 19a2 2 0 0 1-2-2v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H6z" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            }
                                        />
                                        <MetricTile
                                            label="Step Length"
                                            value={parseFloat(biological.step_length_cm)}
                                            unit={biological.step_unit ?? 'cm'}
                                            subValue={`${biological.step_length_in} in`}
                                            color="#e49e3d"
                                            icon={<FiActivity size={18} color="#e49e3d" />}
                                        />
                                        {biological.recorded_at && (
                                            <p className="fs-11 text-muted mb-0 mt-3 pt-2 pb-4 border-top">
                                                Last recorded: {fmtDate(biological.recorded_at.split(' ')[0])}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <div className="d-flex flex-column align-items-center justify-content-center py-4 text-center" style={{ minHeight: 200 }}>
                                        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(2,160,228,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                                            <FiActivity size={22} color="#02a0e4" />
                                        </div>
                                        <p className="fs-13 fw-medium text-dark mb-1">No body data yet</p>
                                        <p className="fs-12 text-muted mb-0">Sync your device to populate height, weight and step length.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ══ HEALTH GOALS ══════════════════════════════════════════ */}
                    <div className="col-xxl-4 col-md-12">
                        <div className="card stretch stretch-full mb-0">
                            <div className="card-header">
                                <h5 className="card-title d-flex align-items-center gap-2">
                                    <FiTarget size={14} className="text-danger" /> Daily Health Goals
                                </h5>
                            </div>
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-around align-items-center flex-grow-1 py-3">
                                    {stepsGoal && (
                                        <GoalRing
                                            value={stepsGoal.target_value}
                                            unit={stepsGoal.unit}
                                            label="Steps Goal"
                                            color="#25b865"
                                        />
                                    )}
                                    {caloriesGoal && (
                                        <GoalRing
                                            value={caloriesGoal.target_value}
                                            unit={caloriesGoal.unit}
                                            label="Calories Goal"
                                            color="#d13b4c"
                                        />
                                    )}
                                    {!stepsGoal && !caloriesGoal && (
                                        <p className="text-muted fs-13 text-center">No goals configured</p>
                                    )}
                                </div>

                                {goals.length > 0 && (
                                    <div className="d-flex gap-2 mt-2 pt-3 border-top">
                                        {goals.map(g => (
                                            <div
                                                key={g.goal_type}
                                                className="flex-grow-1 text-center p-2 rounded"
                                                style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
                                            >
                                                <p className="fs-11 text-muted text-uppercase fw-semibold mb-1" style={{ letterSpacing: '0.4px' }}>
                                                    {g.goal_type}
                                                </p>
                                                <p className="fs-13 fw-bold text-dark mb-0">
                                                    {Number(g.target_value).toLocaleString()}{' '}
                                                    <span className="fs-11 fw-normal text-muted">{g.unit}</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ══ BMI ANALYSIS ══════════════════════════════════════════ */}
                    <div className="col-xxl-6 col-md-12">
                        <div className="card stretch mb-0">
                            <div className="card-header">
                                <h5 className="card-title d-flex align-items-center gap-2">
                                    <FiTrendingUp size={14} className="text-primary" /> BMI Analysis
                                </h5>
                                {bmiData && (
                                    <span className="badge" style={{ background: `${bmiColor}20`, color: bmiColor }}>
                                        {bmiCategory}
                                    </span>
                                )}
                            </div>
                            <div className="card-body">
                                {bmiData ? (
                                    <>
                                        <div className="d-flex align-items-center gap-3 mb-3 pt-3 pb-3">
                                            <div style={{
                                                width: 60, height: 60, borderRadius: 12,
                                                background: `${bmiColor}15`,
                                                border: `1px solid ${bmiColor}30`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                <FiTrendingUp size={24} color={bmiColor} />
                                            </div>
                                            <div>
                                                <p className="fs-11 text-muted text-uppercase fw-semibold mb-0" style={{ letterSpacing: '0.4px' }}>
                                                    Your BMI Score
                                                </p>
                                                <div className="d-flex align-items-baseline gap-2 mt-1">
                                                    <h2 className="fw-bolder mb-0" style={{ color: bmiColor }}>
                                                        {bmiValue.toFixed(2)}
                                                    </h2>
                                                    <span className="badge px-2 py-1 fs-11" style={{ background: `${bmiColor}20`, color: bmiColor }}>
                                                        <FiCheckCircle size={10} className="me-1" />
                                                        {bmiCategory}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <BmiScale value={bmiValue.toFixed(1)} category={bmiCategory} />
                                    </>
                                ) : (
                                    <p className="text-muted fs-13">BMI data not available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ══ BMR CARD ══════════════════════════════════════════════ */}
                    <div className="col-xxl-6 col-md-12">
                        <div className="card mb-0">
                            <div className="card-header">
                                <h5 className="card-title d-flex align-items-center gap-2">
                                    <FiZap size={14} className="text-warning" /> Basal Metabolic Rate
                                </h5>
                                {bmrData && (
                                    <span className="badge bg-soft-warning text-warning">{bmrData.category}</span>
                                )}
                            </div>
                            <div className="card-body">
                                {bmrData ? (
                                    <>
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <div style={{
                                                width: 60, height: 60, borderRadius: 12,
                                                background: 'rgba(228,158,61,0.12)',
                                                border: '1px solid rgba(228,158,61,0.25)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                <FiZap size={24} color="#e49e3d" />
                                            </div>
                                            <div>
                                                <p className="fs-11 text-muted text-uppercase fw-semibold mb-0" style={{ letterSpacing: '0.4px' }}>
                                                    Daily Energy at Rest
                                                </p>
                                                <h2 className="fw-bolder text-warning mb-0 mt-1">
                                                    {Number(bmrData.value).toLocaleString()}
                                                    <small className="fs-14 fw-normal text-muted ms-1">kcal/day</small>
                                                </h2>
                                            </div>
                                        </div>

                                        <div className="p-3 rounded mb-3" style={{ background: 'rgba(228,158,61,0.06)', border: '1px solid rgba(228,158,61,0.14)' }}>
                                            <p className="fs-12 text-muted mb-0">
                                                Your body burns{' '}
                                                <strong className="text-dark">{Number(bmrData.value).toLocaleString()} kcal</strong>{' '}
                                                per day at complete rest — the energy needed for breathing, circulation, and cell repair.
                                            </p>
                                        </div>

                                        <div className="row g-2">
                                            <div className="col-6">
                                                <div className="p-2 rounded text-center" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
                                                    <p className="fs-11 text-muted mb-1 text-uppercase fw-semibold" style={{ letterSpacing: '0.3px' }}>
                                                        Lightly Active
                                                    </p>
                                                    <p className="fs-13 fw-bold text-dark mb-0">
                                                        {Math.round(Number(bmrData.value) * 1.375).toLocaleString()}
                                                        <span className="fs-11 fw-normal text-muted ms-1">kcal</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-2 rounded text-center" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
                                                    <p className="fs-11 text-muted mb-1 text-uppercase fw-semibold" style={{ letterSpacing: '0.3px' }}>
                                                        Moderately Active
                                                    </p>
                                                    <p className="fs-13 fw-bold text-dark mb-0">
                                                        {Math.round(Number(bmrData.value) * 1.55).toLocaleString()}
                                                        <span className="fs-11 fw-normal text-muted ms-1">kcal</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-muted fs-13">BMR data not available</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default TimexSettings
