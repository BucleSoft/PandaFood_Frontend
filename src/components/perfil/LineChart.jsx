import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineChart = () => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true
            },
            title: {
                display: true,
                text: 'Ventas hoy',
                color: "white"
            }
        },
        maintainAspectRatio: false,
        animation: true,
        scales: {
            xAxes: {
                ticks: {
                    color: "white"
                },
                grid: {
                    display: false,
                    borderColor: "white"
                }
            },
            y: {
                ticks: {
                    color: "white"
                },
                grid: {
                    display: false,
                    borderColor: "white"
                },

            }
        }
    };

    return <Line
        className="px-20 mb-10 "
        data={{
            labels: ['Hamburguesa', 'Picada', 'Salchipapa']
            ,
            datasets: [{
                label: "N° vendidos",
                data: [5, 10, 6],
                backgroundColor: [
                    'hsla(356, 86%, 60%, 0.555)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        }}
        height={600}
        width={600}
        options={options}
    />;
};
