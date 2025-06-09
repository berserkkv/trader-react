import React, { useEffect, useRef } from 'react';
import { createChart, LineSeries } from 'lightweight-charts';
import { getPairOrderStatistics } from '../../api/Api';

const PairChart = ({ botId }) => {
    const chartContainerRef = useRef();

    useEffect(() => {
        if (!botId) {

        }

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
            layout: {
                background: { color: '#111827' }, // Tailwind gray-900
                textColor: '#9ca3af', // Tailwind gray-400 for better readability on dark bg
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


        const lineSeries = chart.addSeries(LineSeries, {
            color: '#2196F3',
            lineWidth: 1,
            crossHairMarkerVisible: true,
            crossHairMarkerRadius: 2,
        });

        // getOrderStatistics(botId)
        getPairOrderStatistics(botId)
            .then((response) => {
                const data = response.data.map((point) => ({
                    time: Math.floor(new Date(point.time).getTime() / 1000),
                    value: point.pnl,
                }));
                lineSeries.setData(data);
                lineSeries.createPriceLine({
                    price: 0,
                    color: '#ef4444',
                    lineWidth: 1,
                    lineStyle: 0,
                    axisLabelVisible: false,
                });
            })
            .catch((err) => {
                console.error('Failed to fetch statistics:', err);
            });

        const resizeObserver = new ResizeObserver(() => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        });

        resizeObserver.observe(chartContainerRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };
    }, [botId]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
};

export default PairChart;
