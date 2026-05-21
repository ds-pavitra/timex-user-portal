import React from 'react'
import ReactApexChart from 'react-apexcharts'

const data = [0, 0, 920, 680, 540, 480, 320, 480, 600, 720, 580, 320, 140, 80, 120, 0]

const options = {
    chart: {
        type: 'bar',
        height: 200,
        background: 'transparent',
        toolbar: { show: false },
    },
    colors: ['#02a0e4'],
    plotOptions: {
        bar: { borderRadius: 5, columnWidth: '60%' }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.3,
            opacityFrom: 1,
            opacityTo: 0.5,
        }
    },
    xaxis: {
        categories: ['6','7','8','9','10','11','12','1','2','3','4','5','6','7','8','9'],
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
    series: [{ name: 'Steps', data }]
}

const HourlyActivityChart = () => (
    <ReactApexChart type="bar" options={options} series={options.series} height="100%" />
)

export default HourlyActivityChart
