import React from 'react'
import { FiLogOut, FiUser } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/slices/authSlice'
import { showSuccessToast } from '../../../utils/toast'

const titleCase = (s) => s ? s.replace(/\b\w/g, c => c.toUpperCase()) : ''

const InitialsAvatar = ({ firstName, lastName, size = 40, fontSize = 15 }) => {
    const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || 'U'
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%',
            background: 'linear-gradient(135deg, #3454d1, #02a0e4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize, fontWeight: 700,
            flexShrink: 0, letterSpacing: 0.5,
            boxShadow: '0 2px 10px rgba(2,160,228,0.35)',
            cursor: 'pointer',
            userSelect: 'none',
        }}>
            {initials}
        </div>
    )
}

const ProfileModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, profile } = useSelector((state) => state.auth)

    const firstName = titleCase(profile?.first_name ?? '')
    const lastName = titleCase(profile?.last_name ?? '')
    const displayName = firstName
        ? `${firstName} ${lastName}`.trim()
        : (user?.email || 'User')

    const handleLogout = async (e) => {
        e.preventDefault()
        await dispatch(logoutUser())
        showSuccessToast('Logged out successfully')
        navigate('/authentication/login/creative', { replace: true })
    }

    return (
        <div className="dropdown nxl-h-item">
            <a href="#" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                <InitialsAvatar firstName={firstName} lastName={lastName} size={40} fontSize={15} />
            </a>
            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                <div className="dropdown-header">
                    <div className="d-flex align-items-center gap-3">
                        <InitialsAvatar firstName={firstName} lastName={lastName} size={46} fontSize={17} />
                        <div>
                            <h6 className="text-dark mb-0 fw-bold">{displayName}</h6>
                            <span className="fs-12 fw-medium text-muted">{user?.email || ''}</span>
                        </div>
                    </div>
                </div>
                <div className="dropdown-divider"></div>
                <a href="/ui/profile" className="dropdown-item">
                    <i><FiUser /></i>
                    <span>My Profile</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item" onClick={handleLogout}>
                    <i><FiLogOut /></i>
                    <span>Logout</span>
                </a>
            </div>
        </div>
    )
}

export default ProfileModal
