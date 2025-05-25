import { formatDateTime } from "../tools/Tool";

export default function BotList({ bots }) {

  function formatEmptyField(data) {
    if (data === "" || data === null) {
      return "---";
    }
    return data;
  }

  return (
    <div className="p-0 grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 max-w-2xl m-auto">
      {bots.map((bot) => (
        <div
          key={bot.id}
          className={`bg-gray-900 rounded-lg shadow-md p-4 flex flex-col justify-between
            ${bot.isNotActive ? 'text-gray-500' : 'text-gray-200'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <a href={`/bots/${bot.id}`} className="text-sm hover:underline">
                {bot.name}
              </a>
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







          {bot.inPos && (
            <div className={`mt-2 pt-2 border-t text-gray-100 ${bot.orderType === "LONG" ? "border-up" :
              bot.orderType === "SHORT" ? "border-up" : "border-gray-700"
              }`}>
              <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm">

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
                  <span>{Number(bot.orderStopLoss).toFixed(2)}</span>
                </div>


                <div className="flex flex-col items-end text-right">
                  <span className="text-xs label">Take Profit:</span>
                  <span>{Number(bot.orderTakeProfit).toFixed(2)}</span>
                </div>

              </div>
            </div>

          )}


        </div>
      ))
      }
    </div >
  );
}
