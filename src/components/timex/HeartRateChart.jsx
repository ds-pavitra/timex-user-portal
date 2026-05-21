import React from 'react'
import ReactApexChart from 'react-apexcharts'

const options = {
    chart: {
        type: 'area',
        height: 180,
        background: 'transparent',
        toolbar: { show: false },
    },
    colors: ['#d13b4c'],
    stroke: { width: 2, curve: 'smooth' },
    fill: {
        type: 'gradient',
        gradient: { opacityFrom: 0.15, opacityTo: 0, stops: [0, 100] }
    },
    markers: {
        size: 3,
        colors: ['#d13b4c'],
        strokeColors: '#ffffff',
        strokeWidth: 2
    },
    xaxis: {
        categories: ['6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM'],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: '#91a1b6', fontSize: '10px' } }
    },
    yaxis: {
        min: 40, max: 140,
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
    series: [{
        name: 'Heart Rate (bpm)',
        data: [62, 68, 78, 90, 82, 120, 95, 85, 82, 78, 80, 84, 82]
    }]
}

const HeartRateChart = () => (
    <ReactApexChart type="area" options={options} series={options.series} height="100%" />
)

export default HeartRateChart
