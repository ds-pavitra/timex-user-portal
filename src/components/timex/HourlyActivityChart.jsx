import React from 'react'
import ReactApexChart from 'react-apexcharts'

const HOURS = Array.from({ length: 24 }, (_, i) => String(i))

const HourlyActivityChart = ({ stepsData }) => {
    const data = stepsData && stepsData.length === 24 ? stepsData : Array(24).fill(0)

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
            categories: HOURS,
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
        tooltip: {
            theme: 'light',
            style: { fontSize: '11px' },
            y: { formatter: val => `${val} steps` }
        },
        dataLabels: { enabled: false },
        legend: { show: false },
    }

    return (
        <ReactApexChart
            type="bar"
            options={options}
            series={[{ name: 'Steps', data }]}
            height="100%"
        />
    )
}

export default HourlyActivityChart
