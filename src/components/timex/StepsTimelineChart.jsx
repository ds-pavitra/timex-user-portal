import React from 'react'
import ReactApexChart from 'react-apexcharts'

const options = {
    chart: {
        type: 'bar',
        height: 140,
        background: 'transparent',
        toolbar: { show: false },
    },
    colors: ['#02a0e4'],
    plotOptions: {
        bar: { borderRadius: 4, columnWidth: '55%' }
    },
    xaxis: {
        categories: ['6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM'],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: '#91a1b6', fontSize: '10px' } }
    },
    yaxis: {
        min: 0,
        labels: { style: { colors: '#91a1b6', fontSize: '10px' } }
    },
    grid: {
        borderColor: 'rgba(0,0,0,0.08)',
        strokeDashArray: 3,
        padding: { left: 4, right: 4, bottom: 0 }
    },
    tooltip: { theme: 'light', style: { fontSize: '11px' } },
    dataLabels: { enabled: false },
    legend: { show: false },
    series: [{ name: 'Steps', data: [200, 800, 1200, 600, 900, 1100, 1400, 321] }]
}

const StepsTimelineChart = () => (
    <ReactApexChart type="bar" options={options} series={options.series} height="100%" />
)

export default StepsTimelineChart
