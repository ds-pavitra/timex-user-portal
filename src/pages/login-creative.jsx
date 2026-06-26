import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/store/slices/authSlice'
import { showSuccessToast, showErrorToast } from '../utils/toast'

const LoginCreative = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.auth)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await dispatch(loginUser({ email, password }))
        if (loginUser.fulfilled.match(result)) {
            showSuccessToast(result.payload.message || 'Login successful')
            navigate('/')
        } else {
            showErrorToast(result.payload || 'Login failed. Please check your credentials.')
        }
    }

    return (
        <main className="auth-creative-wrapper">
            <div className="auth-creative-inner">
                <div className="creative-card-wrapper">
                    <div className="card my-4 overflow-hidden" style={{ zIndex: 1 }}>
                        <div className="row flex-1 g-0">
                            <div className="col-lg-6 h-100 my-auto order-1 order-lg-0">
                                <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-50 start-50 d-none d-lg-block">
                                    <img src="./images/logo-abbr.png" alt="img" className="img-fluid" />
                                </div>
                                <div className="creative-card-body card-body p-sm-5">
                                    <h2 className="fs-20 fw-bolder mb-4">Login</h2>
                                    <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
                                    <p className="fs-12 fw-medium text-muted">Welcome back! Please enter your credentials to continue.</p>
                                    <form className="w-100 mt-4 pt-2" onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <button
                                                type="submit"
                                                className="btn btn-lg btn-primary w-100"
                                                disabled={loading}
                                            >
                                                {loading ? 'Logging in...' : 'Login'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 bg-primary order-0 order-lg-1">
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    <img src="./images/auth/auth-user.png" alt="img" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LoginCreative
