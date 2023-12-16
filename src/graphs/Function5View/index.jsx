import React from 'react';
import { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

export default function Function2View({
    chartData,
}) {
    if (!chartData.ready) return <h1>loading...</h1>
    else if (!chartData.functionNumber5) return <h1>No data</h1>
    else console.log('data loaded');

    const chartData1 = {
        labels: chartData.functionNumber5.pointsXs,
        datasets: [
          {
            label: "Unique Connections",
            data: chartData.functionNumber5.pointsYs,
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
                            text: "Users per Day"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }}
            />
            <p>total connections: {chartData.functionNumber2.totalY}</p>
            <p>total unique connections: {chartData.functionNumber5.uniqueUsers}</p>
            <p>total unique connection average: {Math.round(chartData.functionNumber5.totalY / chartData.functionNumber5.totalX)}</p>
        </div>
       
    );
}