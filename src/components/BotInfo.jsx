import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { closePosition, deleteBot, getBotById, getOrders, getOrdersByBotId, startBot, stopBot } from "../api/Api";
import OrderList from "./OrderList";
import { formatDateTime, getPercentage } from "../tools/Tool";
import Chart from "./Chart";

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

  const handleClose = () => {
    closePosition(bot.id).then(() => reloadBot());
  }

  const handelDelete = () => {
    deleteBot(bot.id).then(() => reloadBot());
  }


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
      <a className="underline text-gray-50" href="/" >back</a>
      <div className="py-4 max-w-2xl mx-auto text-gray-200 flex gap-2">

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

        <button onClick={() => handelDelete(bot.id)} >Delete</button>

        {bot.inPos && (
          <button
            onClick={() => handleClose(bot.id)}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded"
          >
            Close Position
          </button>
        )}
      </div >

      <div className="p-0 grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 max-w-2xl m-auto">

        <div
          className={`bg-gray-900 rounded-lg shadow-md p-4 flex flex-col justify-between
                  ${bot.isNotActive ? 'text-gray-500' : 'text-gray-200'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {bot.name}
              </span>
              <div className="text-sm">
                <span className="text- text-gray-400">{bot.leverage}x </span>
                <span className="text-up font-semibold">{bot.totalWins}</span>/
                <span className="text-down font-semibold">{bot.totalLosses}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                {/* additional stats here if needed */}
              </div>
            </div>

            <div className="ml-auto text-right">
              <div className="text-sm font-semibold">
                {Number(bot.currentCapital).toFixed(2)}
              </div>
              <p className="text-xs text-gray-400">{formatDateTime(bot.lastScanned)}</p>
            </div>
          </div>

          <div className="flex pt-2 justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs label">TakeProfit:</span>
              <span>
                %{Number(bot.takeProfit).toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col items-end text-right">
              <span className="text-xs label">Stop Loss:</span>
              <span>
                %{Number(bot.stopLoss).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex pt-2 justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs label">Log:</span>
              <span>
                {bot.strategyInfo}
              </span>
            </div>
          </div>


          {bot.inPos && (
            <div className={`mt-4 pt-4 border-t text-gray-100 ${bot.orderType === "LONG" ? "border-up" :
              bot.orderType === "SHORT" ? "border-down" : "border-gray-700"
              }`}>
              <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-xs label">Order Type:</span>
                  <span className={`text-xs ${bot.orderType === "LONG" ? "text-up" : bot.orderType === "SHORT" ? "text-down" : "text-gray-300"}`}>
                    {bot.orderType}
                  </span>
                </div>
                <div></div>
                <div className="flex flex-col items-end text-right">
                  <span className="text-xs label">Scanned:</span>
                  <span>{formatDateTime(bot.orderScannedTime)}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs label">PNL:</span>
                  <span className={
                    bot.pnl > 0 ? "text-up" :
                      bot.pnl < 0 ? "text-down" :
                        ""
                  }>
                    {Number(bot.pnl).toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs label">Created Time:</span>
                  <span>{formatDateTime(bot.orderCreatedTime)}</span>
                </div>

                {/* Column 3 - right aligned */}
                <div className="flex flex-col items-end text-right">
                  <span className="text-xs label">ROE:</span>
                  <span className={
                    bot.roe > 0 ? "text-up" :
                      bot.roe < 0 ? "text-down" :
                        ""
                  }>
                    %{Number(bot.roe).toFixed(2)}
                  </span>
                </div>


                <div className="flex flex-col">
                  <span className="text-xs label">Entry Price:</span>
                  <span>{bot.orderEntryPrice}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs label">Stop Loss:</span>
                  <span>{Number(bot.orderStopLoss).toFixed(2)}
                    <span className="text-xs pl-1">
                      ({getPercentage(bot.orderEntryPrice, bot.orderStopLoss, bot.leverage, bot.orderType)}%)
                    </span>
                  </span>
                </div>


                <div className="flex flex-col items-end text-right">
                  <span className="text-xs label">Take Profit:</span>
                  <span>{Number(bot.orderTakeProfit).toFixed(2)}
                    <span className="text-xs pl-1">
                      ({getPercentage(bot.orderEntryPrice, bot.orderTakeProfit, bot.leverage, bot.orderType)}%)
                    </span>
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs label">Capital:</span>
                  <span className="">{Number(bot.orderCapital).toFixed(2)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs label">Capital with Leverage:</span>
                  <span className="">{Number(bot.orderCapitalWithLeverage).toFixed(2)}</span>
                </div>

                <div className="flex flex-col items-end text-right">
                  <span className="text-xs label">Fee:</span>
                  <span>{Number(bot.orderFee).toFixed(2)}</span>
                </div>

              </div>
            </div>

          )}


        </div>


      </div >
      <div className="py-4 max-w-2xl mx-auto text-gray-200">
        <Chart botId={id} />
      </div>

      <div className="py-4 max-w-2xl mx-auto text-gray-200">
        <OrderList orders={orders} />
      </div>
    </div >

  );
}