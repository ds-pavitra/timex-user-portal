import React from 'react'
import { FiLogOut, FiUser } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../api/config'
import { showSuccessToast, showErrorToast } from '../../../utils/toast'

const ProfileModal = () => {
    const navigate = useNavigate()

    const user = JSON.parse(sessionStorage.getItem('user') || '{}')
    const profile = JSON.parse(sessionStorage.getItem('profile') || '{}')
    const displayName = profile.first_name
        ? `${profile.first_name} ${profile.last_name}`
        : (user.email || 'User')

    const handleLogout = async (e) => {
        e.preventDefault()
        const refreshToken = sessionStorage.getItem('refresh_token')
        try {
            const response = await fetch(`${BASE_URL}v2/auth/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh_token: refreshToken }),
            })
            const data = await response.json()
            if (response.ok && data.status === 'success') {
                showSuccessToast(data.message || 'Logged out successfully')
            } else {
                showErrorToast(data.message || 'Logout failed')
            }
        } catch {
            showErrorToast('Network error during logout')
        } finally {
            sessionStorage.removeItem('access_token')
            sessionStorage.removeItem('refresh_token')
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('profile')
            navigate('/authentication/login/creative', { replace: true })
        }
    }

    return (
        <div className="dropdown nxl-h-item">
            <a href="#" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                <img src="/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar me-0" />
            </a>
            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                <div className="dropdown-header">
                    <div className="d-flex align-items-center">
                        <img src="/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar" />
                        <div>
                            <h6 className="text-dark mb-0">{displayName}</h6>
                            <span className="fs-12 fw-medium text-muted">{user.email || ''}</span>
                        </div>
                    </div>
                </div>
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
