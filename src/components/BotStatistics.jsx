import { useEffect, useState } from "react";
import { getBotsStatistics } from "../api/Api";

export default function BotStatistics() {
    const [st, setSt] = useState([]);

    const fetchBotsStatistics = async () => {
        const res = await getBotsStatistics();
        setSt(res.data);
    };

    useEffect(() => {
        fetchBotsStatistics();
    }, []);

    return (
        <div className="p-4 max-w-4xl mx-auto space-y-6 text-gray-200">
            <h2 className="text-xl font-semibold mb-4">Bot Statistics</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="">
                        <th className="border border-gray-500 px-4 py-2">Strategy</th>
                        <th className="border border-gray-500 px-4 py-2">Total</th>
                        <th className="border border-gray-500 px-4 py-2">1m</th>
                        <th className="border border-gray-500 px-4 py-2">5m</th>
                        <th className="border border-gray-500 px-4 py-2">15m</th>
                        <th className="border border-gray-500 px-4 py-2">Bot Count</th>
                    </tr>
                </thead>
                <tbody>
                    {st.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                Loading...
                            </td>
                        </tr>
                    ) : (
                        st.map((stat, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "" : "bg-gray-800"}>
                                <td className="border border-gray-500 px-4 py-2">{stat.StrategyName}</td>
                                <td className="border border-gray-500 px-4 py-2">{stat.Total.toFixed(2)}</td>
                                <td className="border border-gray-500 px-4 py-2">{stat.M1.toFixed(2)}</td>
                                <td className="border border-gray-500 px-4 py-2">{stat.M5.toFixed(2)}</td>
                                <td className="border border-gray-500 px-4 py-2">{stat.M15.toFixed(2)}</td>
                                <td className="border border-gray-500 px-4 py-2">{stat.BotCount}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table >
        </div >
    );
}
