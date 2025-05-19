import { formatDateTime } from "../tools/Tool";


export default function OrderList({ orders }) {
  return (
    <div className="overflow-x-auto bg-gray-900 p-4 rounded-xl shadow-lg">
      <table className="min-w-full table-auto border text-sm text-gray-200">
        <thead>
          <tr className="bg-gray-800 text-xs tracking-wider text-gray-400">
            <th className="px-4 py-3 border border-gray-700">ID</th>
            <th className="px-4 py-3 border border-gray-700">Symbol</th>
            <th className="px-4 py-3 border border-gray-700">Type</th>
            <th className="px-4 py-3 border border-gray-700">Bot ID</th>
            <th className="px-4 py-3 border border-gray-700">Entry Price</th>
            <th className="px-4 py-3 border border-gray-700">Exit Price</th>
            <th className="px-4 py-3 border border-gray-700">Quantity</th>
            <th className="px-4 py-3 border border-gray-700">P/L</th>
            <th className="px-4 py-3 border border-gray-700">P/L %</th>
            <th className="px-4 py-3 border border-gray-700">Created</th>
            <th className="px-4 py-3 border border-gray-700">Closed</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="text-center border-t border-gray-700 hover:bg-gray-800 transition-colors"
            >
              <td className="px-4 py-2 border border-gray-700">{order.id}</td>
              <td className="px-4 py-2 border border-gray-700">{order.symbol.name || order.symbol}</td>
              <td className="px-4 py-2 border border-gray-700">{order.type}</td>
              <td className="px-4 py-2 border border-gray-700">{order.botId}</td>
              <td className="px-4 py-2 border border-gray-700">{Number(order.entryPrice).toFixed(2)}</td>
              <td className="px-4 py-2 border border-gray-700">{Number(order.exitPrice).toFixed(2)}</td>
              <td className="px-4 py-2 border border-gray-700">{Number(order.quantity).toFixed(2)}</td>
              <td className="px-4 py-2 border border-gray-700">{Number(order.profitLoss).toFixed(2)}</td>
              <td
                className={`px-4 py-2 border border-gray-700 ${
                  order.profitLossPercent >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {Number(order.profitLossPercent).toFixed(2)}
              </td>
              <td className="px-4 text-xs py-2 border border-gray-700">
                {formatDateTime(order.createdTime)}
              </td>
              <td className="px-4 text-xs not-[]:py-2 border border-gray-700">
                {formatDateTime(order.closedTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
