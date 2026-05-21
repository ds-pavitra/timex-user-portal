import React from 'react'
import ReactApexChart from 'react-apexcharts'

const options = {
    chart: {
        type: 'area',
        height: 100,
        background: 'transparent',
        toolbar: { show: false },
    },
    colors: ['#e49e3d'],
    stroke: { width: 2, curve: 'smooth' },
    fill: {
        type: 'gradient',
        gradient: { opacityFrom: 0.15, opacityTo: 0, stops: [0, 100] }
    },
    markers: { size: 2, colors: ['#e49e3d'], strokeColors: '#ffffff', strokeWidth: 1 },
    xaxis: {
        categories: ['6AM','9AM','12PM','3PM','6PM','9PM'],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: '#91a1b6', fontSize: '10px' } }
    },
    yaxis: {
        min: 0, max: 100,
        labels: { style: { colors: '#91a1b6', fontSize: '10px' } }
    },
    grid: {
        borderColor: 'rgba(0,0,0,0.08)',
        strokeDashArray: 3,
        padding: { left: 4, right: 4 }
    },
    tooltip: { theme: 'light', style: { fontSize: '11px' } },
    dataLabels: { enabled: false },
    legend: { show: false },
    series: [{ name: 'Stress', data: [22, 28, 45, 35, 30, 20] }]
}

const StressChart = () => (
    <ReactApexChart type="area" options={options} series={options.series} height="100%" />
)

export default StressChart
