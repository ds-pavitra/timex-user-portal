import React from 'react'
import ReactApexChart from 'react-apexcharts'

const WeeklyStepsChart = ({ dailyData, stepsGoal }) => {
    const days = dailyData ? dailyData.map(d => d.day) : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const steps = dailyData ? dailyData.map(d => d.steps) : [0, 0, 0, 0, 0, 0, 0]
    const goal = stepsGoal || 10000
    const goalLine = days.map(() => goal)

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
            categories: days,
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
        tooltip: {
            theme: 'light',
            style: { fontSize: '11px' },
            y: { formatter: val => `${val.toLocaleString()} steps` }
        },
        dataLabels: { enabled: false },
        legend: { show: false },
    }

    return (
        <ReactApexChart
            type="bar"
            options={options}
            series={[
                { name: 'Steps', type: 'bar', data: steps },
                { name: 'Goal', type: 'line', data: goalLine },
            ]}
            height="100%"
        />
    )
}

export default WeeklyStepsChart
