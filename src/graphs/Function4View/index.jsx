import React from 'react';
import { useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

export default function Function4View({
    chartData,
}) {
    if (!chartData.ready) return <h1>loading...</h1>
    else if (!chartData.functionNumber4) return <h1>No data</h1>
    else console.log('data loaded');

    const chartData1 = {
        labels: chartData.functionNumber4.pointsXs,
        datasets: chartData.functionNumber4.pointsYs
    }

    return (
        <div className="App">
            <Line
                data={chartData1}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "First Connection of User"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }}
            />
            <p>total connections: {chartData.functionNumber4.totalY}</p>
        </div>
    );
}