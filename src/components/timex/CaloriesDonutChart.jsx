import React from 'react'
import ReactApexChart from 'react-apexcharts'

const options = {
    chart: {
        type: 'donut',
        height: 120,
        background: 'transparent',
    },
    colors: ['#d13b4c', 'rgba(0,0,0,0.06)'],
    plotOptions: {
        pie: {
            donut: { size: '72%', background: 'transparent' }
        }
    },
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { theme: 'light', style: { fontSize: '11px' } },
    series: [2967, 533],
    labels: ['Burned', 'Remaining']
}

const CaloriesDonutChart = () => (
    <ReactApexChart type="donut" options={options} series={options.series} height={120} />
)

export default CaloriesDonutChart
