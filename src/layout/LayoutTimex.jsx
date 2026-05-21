import React from 'react'
import { Outlet } from 'react-router-dom'
import TimexSidebar from '@/components/timex/TimexSidebar'
import TimexTopbar from '@/components/timex/TimexTopbar'
import '../styles/timex.css'

const LayoutTimex = () => {
    return (
        <div className="timex-layout">
            <TimexSidebar />
            <div className="tx-main">
                <TimexTopbar />
                <div className="tx-content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LayoutTimex
