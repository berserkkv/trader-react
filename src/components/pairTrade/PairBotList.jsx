import { useEffect, useState } from "react";
import { formatDateTime, getPercentage } from "../../tools/Tool";
import { getPairBots } from "../../api/Api";


export default function PairBotList() {
    const getStoredFilters = () => {
        const stored = localStorage.getItem("pairBotFilters");
        return stored
            ? JSON.parse(stored)
            : {
                isNotActive: "",
                inPos: "",
                timeframe: "",
                symbol: "",
            };
    };

    const [bots, setBots] = useState([]);
    const [filters, setFilters] = useState(getStoredFilters);

    const fetchBots = async () => {
        const cleanedFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== "")
        );
        const res = await getPairBots(cleanedFilters);
        setBots(res.data);
    };

    useEffect(() => {
        localStorage.setItem("pairBotFilters", JSON.stringify(filters));
        fetchBots();
    }, [filters]);

    return (
        <div className="px-2 grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 max-w-2xl m-auto">



            {/* 🔍 Filter dropdowns */}
            {/* <div className="grid grid-cols-5 sm:grid-cols-5 gap-4 my-1">
                <div className="flex flex-col space-y-1">
                    <label className="text-xs text-gray-500 font-medium">Active</label>

                    <select
                        className="bg-gray-800 text-gray-300 p-0.5 rounded"
                        value={filters.isNotActive}
                        onChange={(e) =>
                            setFilters({ ...filters, isNotActive: e.target.value })
                        }
                    >
                        <option value="">All</option>
                        <option value="false">Active</option>
                        <option value="true">Inactive</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-1">
                    <label className="text-xs text-gray-500 font-medium">Strategy</label>
                    <select
                        className="bg-gray-800 text-gray-300 p-0.5 rounded"
                        value={filters.strategy}
                        onChange={(e) =>
                            setFilters({ ...filters, strategy: e.target.value })
                        }
                    >
                        <option value="">All</option>
                        <option value="HA">HA</option>
                        <option value="BBHA">BBHA</option>
                        <option value="BBHA2">BBHA2</option>
                        <option value="BBHA3">BBHA3</option>
                        <option value="HAEMA">HAEMA</option>
                        <option value="HASmoothed">HASmoothed</option>
                        <option value="HASmoothedEMA">HASmoothedEMA</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-1">
                    <label className="text-xs text-gray-500 font-medium">Symbol</label>
                    <select
                        className="bg-gray-800 text-gray-300 p-0.5 rounded"
                        value={filters.symbol}
                        onChange={(e) =>
                            setFilters({ ...filters, symbol: e.target.value })
                        }
                    >
                        <option value="">All</option>
                        <option value="SOLUSDT">SOLUSDT</option>
                        <option value="ETHUSDT">ETHUSDT</option>
                        <option value="BNBUSDT">BNBUSDT</option>
                        <option value="BTCUSDT">BTCUSDT</option>
                        <option value="XRPUSDT">XRPUSDT</option>
                        <option value="DOGEUSDT">DOGEUSDT</option>
                        <option value="ADAUSDT">ADAUSDT</option>
                        <option value="LTCUSDT">LTCUSDT</option>
                    </select>
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="text-xs text-gray-500 font-medium">Timeframe</label>
                    <select
                        className="bg-gray-800 text-gray-300 p-0.5 rounded"
                        value={filters.timeframe}
                        onChange={(e) =>
                            setFilters({ ...filters, timeframe: e.target.value })
                        }
                    >
                        <option value="">All</option>
                        <option value="1m">1m</option>
                        <option value="5m">5m</option>
                        <option value="15m">15m</option>
                    </select>
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="text-xs text-gray-500 font-medium">Position</label>

                    <select
                        className="bg-gray-800 text-gray-300 p-0.5 rounded"
                        value={filters.inPos}
                        onChange={(e) =>
                            setFilters({ ...filters, inPos: e.target.value })
                        }
                    >
                        <option value="">All</option>
                        <option value="true">Open</option>
                    </select>
                </div>
            </div> */}




            {bots.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No bots found.</div>
            ) : (
                <div className="flex flex-col gap-4 mb-4 b border-b-2 border-gray-500 pb-4">
                    {bots.map((bot) => (
                        <div
                            key={bot.id}
                            className={`bg-gray-900 rounded-lg shadow-md p-4 flex flex-col justify-between ${bot.isNotActive ? "text-gray-500" : "text-gray-200"
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <a href={`/pair_bots/${bot.id}`} className="text-sm hover:underline">
                                        {bot.name}
                                    </a>
                                    <div className="text-sm">
                                        <span className="text-gray-400">{bot.leverage}x </span>
                                        <span className="ml-1 text-up font-semibold">{bot.totalWins}</span>/
                                        <span className="text-down font-semibold">{bot.totalLosses}</span>
                                        <span className="ml-1 text-gray-300"> {Number(bot.zScore).toFixed(2)}</span>

                                    </div>
                                </div>

                                <div className="ml-auto text-right">
                                    <div className="text-sm font-semibold">
                                        <span className="text-xs text-gray-400 mr-1">
                                            ({Number(bot.currentCapital + bot.orderCapital1 + bot.orderCapital2).toFixed(2)})
                                        </span>
                                        {Number(bot.currentCapital).toFixed(2)}
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        {bot.inPos ? formatDateTime(bot.orderScannedTime2) : formatDateTime(bot.lastScanned)}
                                    </p>
                                </div>

                            </div>

                            {bot.inPos && (
                                <div
                                    className={`mt-2 pt-2 border-t text-gray-100 ${bot.orderType1 === "LONG"
                                        ? "border-up"
                                        : bot.orderType1 === "SHORT"
                                            ? "border-down"
                                            : "border-gray-700"
                                        }`}
                                >
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-xs label">PNL:</span>
                                            <span
                                                className={
                                                    bot.pnl1 + bot.pnl2 > 0
                                                        ? "text-up"
                                                        : bot.pnl1 + bot.pnl2 < 0
                                                            ? "text-down"
                                                            : ""
                                                }
                                            >
                                                {Number(bot.pnl1 + bot.pnl2).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-xs label">Created Time:</span>
                                            <span>{formatDateTime(bot.orderCreatedTime1)}</span>
                                        </div>

                                        <div className="flex flex-col items-end text-right">
                                            <span className="text-xs label">ROE:</span>
                                            <span
                                                className={
                                                    bot.roe1 + bot.roe2 > 0
                                                        ? "text-up"
                                                        : bot.roe1 + bot.roe2 < 0
                                                            ? "text-down"
                                                            : ""
                                                }
                                            >
                                                %{Number(bot.roe1 + bot.roe2).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-xs label">Entry Price 1:</span>
                                            <span>{bot.orderEntryPrice1}</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-xs label">Entry Price 2:</span>
                                            <span>{bot.orderEntryPrice2}</span>
                                        </div>

                                        <div className="flex flex-col items-end text-right">
                                            <span className="text-xs label">ZScore:</span>
                                            <span>
                                                {Number(bot.zScore).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
