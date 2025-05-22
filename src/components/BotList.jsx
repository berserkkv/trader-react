import { formatDateTime } from "../tools/Tool";

export default function BotList({ bots }) {



  function formatEmptyField(data) {
    if (data === "" || data === null) {
      return "---";
    }
    return data;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-gray-950 p-4">
      <table className="min-w-full table-auto border-collapse text-sm text-gray-200">
        <thead>
          <tr className="bg-gray-800 text-gray-400">
            {[
              "ID", "Name", "Current", "Trades", "Last Scanned", "Order Type", "Order Time",
              "Entry Price", "Stop Loss", "Take Profit"
            ].map((title) => (
              <th key={title} className="px-3 py-2 border-b border-gray-700 text-xs font-semibold text-left">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bots.map((bot, index) => (
            <tr

              key={bot.id}
              className={`border-b border-gray-800 hover:bg-gray-800 ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-950'} ${bot.isNotActive ? 'text-gray-500' : 'text-gray-50'}`}
            >
              <td className="px-3 py-2">{bot.id}</td>
              <td className="px-3 py-2"><a href={`/bots/${bot.id}`}>{bot.name}</a></td>
              <td className="px-3 py-2">{Number(bot.currentCapital).toFixed(2)}</td>
              <td className="px-3 py-2">
                <span className="text-green-600">{bot.totalWins}</span>
                /
                <span className="text-red-700">{bot.totalLosses}</span>
              </td>
              <td className="px-3 py-2">{formatDateTime(bot.lastScanned)}</td>
              <td className="px-3 py-2">{formatEmptyField(bot.orderType)}</td>
              <td className="px-3 py-2">{formatDateTime(bot.orderCreatedTime)}</td>
              <td className="px-3 py-2">{bot.orderEntryPrice}</td>
              <td className="px-3 py-2">{Number(bot.orderStopLoss).toFixed(2)}</td>
              <td className="px-3 py-2">{Number(bot.orderTakeProfit).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
