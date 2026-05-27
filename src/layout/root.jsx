import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import NavigationManu from '@/components/shared/navigationMenu/NavigationMenu'
import Header from '@/components/shared/header/Header'
import useBootstrapUtils from '@/hooks/useBootstrapUtils'
import SupportDetails from '@/components/supportDetails'

const RootLayout = () => {
    const pathName = useLocation().pathname
    const navigate = useNavigate()
    useBootstrapUtils(pathName)

    useEffect(() => {
        const token = sessionStorage.getItem('access_token')
        if (!token) {
            navigate('/authentication/login/creative', { replace: true })
        }
    }, [navigate])

    return (
        <>
            <Header />
            <NavigationManu />
            <main className="nxl-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div className="nxl-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Outlet />
                </div>
            </main>
            <SupportDetails />
        </>
    )
}

export default RootLayout