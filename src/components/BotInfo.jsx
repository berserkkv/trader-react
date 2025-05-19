import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBotById, getOrders, getOrdersByBotId, startBot, stopBot } from "../api/Api";
import OrderList from "./OrderList";

export default function BotInfo() {
  const { id } = useParams();
  const [bot, setBot] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBotById(id)
      .then((res) => {
        setBot(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bot", err);
        setLoading(false);
      });

    getOrdersByBotId(id)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
      });
  }, [id]);

  const handleStart = () => {
    startBot(bot.id).then(() => reloadBot());
  };

  const handleStop = () => {
    stopBot(bot.id).then(() => reloadBot());
  };

  const reloadBot = () => {
    getBotById(id).then(res => setBot(res.data));
  };


  if (loading) return <div className="text-gray-300">Loading bot info...</div>;
  if (!bot || bot.id === 0) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-gray-200">
        <a className="underline" href="/" >back</a>
        <div className=" rounded-xl  mt-6 text-center text-xl">

          <br />
          Bot not found
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-6 max-w-2xl mx-auto bg-gray-900 text-gray-300 rounded-xl shadow-lg mt-6 space-y-4">
        <a className="underline" href="/" >back</a>
        <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2">
          {bot.name}{" "}
          <span className={`text-xs ${bot.isNotActive ? "text-red-400" : "text-green-400"}`}>
            {bot.isNotActive ? "Stopped" : "Active"}
          </span>

        </h2>
        {bot.isNotActive ? (
          <button
            onClick={() => handleStart(bot.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => handleStop(bot.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Stop
          </button>
        )}



        <div className="space-y-2">
          <InfoRow label="Symbol" value={bot.symbol} />
          <InfoRow label="Time Frame" value={bot.timeFrame} />
          <InfoRow label="Strategy" value={bot.strategyName} />
          <InfoRow label="Initial Capital" value={`${Number(bot.initialCapital).toFixed(2)
            }`} />
          <InfoRow label="Current Capital" value={`${Number(bot.currentCapital).toFixed(2)}`} />
          <InfoRow label="Wins / Losses / Trades" value={`${bot.totalWins} / ${bot.totalLosses} / ${bot.totalTrades}`} />
          <InfoRow label="Streaks" value={`W: ${bot.currentWinsStreak} (Max: ${bot.maxWinsStreak}), L: ${bot.currentLossStreak} (Max: ${bot.maxLossStreak})`} />
        </div>
        {bot.inPos && (
          <div className="space-y-2 border-2 border-gray-800 p-4 rounded-lg">
            <InfoRow label="Order Type" value={bot.orderType} />
            <InfoRow label="Order Entry Price" value={`$${bot.orderEntryPrice}`} />
            <InfoRow label="Stop Loss / Take Profit" value={`SL: ${Number(bot.orderStopLoss).toFixed(2)}, TP: ${Number(bot.orderTakeProfit).toFixed(2)}`} />
            <InfoRow label="Quantity" value={`${Number(bot.orderQuantity).toFixed(2)}`} />
            <InfoRow label="Capital" value={`${Number(bot.orderCapital).toFixed(2)}`} />
            <InfoRow label="Fee" value={`${Number(bot.orderFee).toFixed(2)}`} />

            <InfoRow label="Created At" value={new Date(bot.orderCreatedTime).toLocaleString()} />
          </div>
        )}

      </div>
      <div className="p-6 max-w-4xl mx-auto mt-6 space-y-4">
        <OrderList orders={orders} />
      </div>
    </div >

  );
}

function InfoRow({ label, value, color = "text-gray-300" }) {
  return (
    <div className="flex justify-between border-b border-gray-800 py-1">
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`text-sm font-medium ${color}`}>{value}</span>
    </div>
  );
}