export default function BotList({ bots }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-gray-950 p-4">
      <table className="min-w-full table-auto border-collapse text-sm text-gray-200">
        <thead>
          <tr className="bg-gray-800 text-gray-400">
            {[
              "ID", "Name", "Symbol", "Active", "TimeFrame", "Strategy", "Initial", "Current",
              "Wins", "Losses", "Trades", "Win Streak", "Loss Streak", "Max Win Streak",
              "Max Loss Streak", "In Position", "Order Type", "Order Time", "Quantity",
              "Capital", "Entry Price", "Stop Loss", "Take Profit"
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
              className={`border-b border-gray-800 hover:bg-gray-800 ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-950'}`}
            >
              <td className="px-3 py-2">{bot.id}</td>
              <td className="px-3 py-2">{bot.name}</td>
              <td className="px-3 py-2">{bot.symbol.name || bot.symbol}</td>
              <td className="px-3 py-2">{bot.isNotActive ? "No" : "Yes"}</td>
              <td className="px-3 py-2">{bot.timeFrame.name || bot.timeFrame}</td>
              <td className="px-3 py-2">{bot.strategyName}</td>
              <td className="px-3 py-2">{bot.initialCapital}</td>
              <td className="px-3 py-2">{bot.currentCapital}</td>
              <td className="px-3 py-2">{bot.totalWins}</td>
              <td className="px-3 py-2">{bot.totalLosses}</td>
              <td className="px-3 py-2">{bot.totalTrades}</td>
              <td className="px-3 py-2">{bot.currentWinsStreak}</td>
              <td className="px-3 py-2">{bot.currentLossStreak}</td>
              <td className="px-3 py-2">{bot.maxWinsStreak}</td>
              <td className="px-3 py-2">{bot.maxLossStreak}</td>
              <td className="px-3 py-2">{bot.inPos ? "Yes" : "No"}</td>
              <td className="px-3 py-2">{bot.orderType}</td>
              <td className="px-3 py-2">{new Date(bot.orderCreatedTime).toLocaleString()}</td>
              <td className="px-3 py-2">{bot.orderQuantity}</td>
              <td className="px-3 py-2">{bot.orderCapital}</td>
              <td className="px-3 py-2">{bot.orderEntryPrice}</td>
              <td className="px-3 py-2">{bot.orderStopLoss}</td>
              <td className="px-3 py-2">{bot.orderTakeProfit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
