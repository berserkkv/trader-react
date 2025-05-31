import React, { useEffect, useRef, useState } from 'react';
import { createChart, LineSeries } from 'lightweight-charts';
import { getAllOrderStatistics } from '../api/Api';

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080'];

const AllChart = () => {
    const chartContainerRef = useRef();
    const chartRef = useRef(null);
    const seriesRefs = useRef([]); // To track created series
    const [bots, setBots] = useState([]); // [{name, color}]

    // Create chart on mount
    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
            layout: {
                background: { color: '#111827' }, // Tailwind gray-900
                textColor: '#9ca3af', // Tailwind gray-400
                attributionLogo: false,
            },
            grid: {
                vertLines: { color: '#1f2937' }, // Tailwind gray-800
                horzLines: { color: '#1f2937' }, // Tailwind gray-800
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                borderColor: '#374151', // Tailwind gray-700
            },
            crosshair: {
                vertLine: {
                    color: '#4b5563', // Tailwind gray-600
                    width: 1,
                    style: 0,
                },
                horzLine: {
                    color: '#4b5563',
                    width: 1,
                    style: 0,
                },
            },
        });

        chartRef.current = chart;

        return () => {
            chart.remove();
            seriesRefs.current = [];
        };
    }, []);

    // Fetch data and update chart & bots legend
    useEffect(() => {
        if (!chartRef.current) return;

        getAllOrderStatistics()
            .then((res) => {
                const data = res.data;

                // Map bot names to colors
                const botsWithColors = Object.keys(data).map((name, index) => ({
                    name,
                    color: colors[index % colors.length],
                }));
                setBots(botsWithColors);

                // Remove old series
                seriesRefs.current.forEach((series) => chartRef.current.removeSeries(series));
                seriesRefs.current = [];

                // Add new series for each bot
                Object.entries(data).forEach(([key, stats], index) => {
                    const lineSeries = chartRef.current.addSeries(LineSeries, {
                        color: colors[index % colors.length],
                        lineWidth: 1,
                        lastValueVisible: true,
                        crossHairMarkerVisible: true,
                        priceLineVisible: false,
                    });

                    const chartData = stats.map(({ pnl, time }) => ({
                        time: Math.floor(new Date(time).getTime() / 1000),
                        value: pnl,
                    }));

                    lineSeries.setData(chartData);
                    seriesRefs.current.push(lineSeries);
                });

                // Get all timestamps to set visible range and avoid empty spaces
                const allTimes = Object.values(data)
                    .flatMap((stats) => stats.map(({ time }) => Math.floor(new Date(time).getTime() / 1000)));

                const earliestTimestamp = Math.min(...allTimes);
                const latestTimestamp = Math.max(...allTimes);

                // Set visible time range to exactly fit data
                chartRef.current.timeScale().setVisibleRange({
                    from: earliestTimestamp,
                    to: latestTimestamp,
                });
            })
            .catch((err) => {
                console.error('Error loading statistics:', err);
            });
    }, [chartRef.current]);

    return (
        <div className="p-3">
            <div ref={chartContainerRef} />

            <div className="mt-4 text-gray-100">
                <p>Bot Names:</p>
                <ul>
                    {bots.map(({ name, color }) => (
                        <li
                            key={name}
                            style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}
                        >
                            <div
                                style={{
                                    width: 16,
                                    height: 16,
                                    backgroundColor: color,
                                    marginRight: 8,
                                    borderRadius: 3,
                                }}
                            />
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AllChart;
