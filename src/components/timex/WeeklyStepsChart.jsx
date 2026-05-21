import React from 'react'
import ReactApexChart from 'react-apexcharts'

const options = {
    chart: {
        type: 'bar',
        height: 180,
        background: 'transparent',
        toolbar: { show: false },
    },
    colors: ['#02a0e4', 'rgba(0,0,0,0.2)'],
    plotOptions: {
        bar: { borderRadius: 5, columnWidth: '55%' }
    },
    xaxis: {
        categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
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
    stroke: {
        width: [0, 2],
        dashArray: [0, 4],
        curve: 'straight'
    },
    markers: { size: [0, 0] },
    tooltip: { theme: 'light', style: { fontSize: '11px' } },
    dataLabels: { enabled: false },
    legend: { show: false },
    series: [
        { name: 'Steps', type: 'bar',  data: [8200, 10400, 6521, 7800, 9100, 5200, 3000] },
        { name: 'Goal',  type: 'line', data: [10000, 10000, 10000, 10000, 10000, 10000, 10000] }
    ]
}

const WeeklyStepsChart = () => (
    <ReactApexChart type="bar" options={options} series={options.series} height="100%" />
)

export default WeeklyStepsChart
