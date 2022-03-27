import React from 'react';
import { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

export default function Function1View({
    chartData,
}) {
    if (!chartData.ready) return <h1>loading...</h1>
    else if (!chartData.functionNumber1) return <h1>No data</h1>
    else console.log('data loaded');

    const chartData1 = {
        labels: chartData.functionNumber1.pointsXs,
        datasets: [
          {
            label: "Connections",
            data: chartData.functionNumber1.pointsYs,
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
            ]
          }
        ]
    }

    return (
        <div className="App">
            <Bar
                data={chartData1}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Connections per User"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }}
            />
            <p>total connections: {chartData.functionNumber1.totalY}</p>
            <p>total users: {chartData.functionNumber1.totalX}</p>
        </div>
    );
}