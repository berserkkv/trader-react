import { useEffect, useState } from "react";
import { getStats } from "../api/Api";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function BotStatistics() {
    const [data, setData] = useState({
        Sol15: [],
        Sol1: [],
        Eth15: [],
        Eth1: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStats()
            .then(res => {
                const format = (arr) =>
                    arr.map(s => ({
                        time: new Date(s.time).toLocaleString(),
                        balance: s.balance,
                    }));
                setData({
                    Sol15: format(res.data.Sol15),
                    Sol1: format(res.data.Sol1),
                    Eth15: format(res.data.Eth15),
                    Eth1: format(res.data.Eth1),
                });
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch statistics", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="w-full h-[500px]">
            <h2 className="text-xl font-bold mb-4">Strategy Balance Over Time</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" type="category" allowDuplicatedCategory={false} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line data={data.Sol15} type="monotone" dataKey="balance" name="SOL 15m" stroke="#8884d8" dot={false} />
                    <Line data={data.Sol1} type="monotone" dataKey="balance" name="SOL 1m" stroke="#82ca9d" dot={false} />
                    <Line data={data.Eth15} type="monotone" dataKey="balance" name="ETH 15m" stroke="#ffc658" dot={false} />
                    <Line data={data.Eth1} type="monotone" dataKey="balance" name="ETH 1m" stroke="#ff7300" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
