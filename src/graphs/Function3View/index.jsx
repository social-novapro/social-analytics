import React from 'react';
import { useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

export default function Function3View({
    chartData,
}) {
    if (!chartData.ready) return <h1>loading...</h1>
    else if (!chartData.functionNumber3) return <h1>No data</h1>
    else console.log('data loaded');

    const chartData1 = {
        labels: chartData.functionNumber3.pointsXs,
        datasets: chartData.functionNumber3.pointsYs

    }

    return (
        <div className="App">
            <Line
                data={chartData1}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Connections per User per Day"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }}
            />
            <p>total connections: {chartData.functionNumber3.totalY}</p>
        </div>
    );
}