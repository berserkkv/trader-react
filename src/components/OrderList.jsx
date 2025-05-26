import { formatDateTime } from "../tools/Tool";

export default function OrderList({ orders }) {
  const hasOrders = orders.length > 0;

  const ArrowUp = () => (
    <svg className="w-4 h-4 text-up" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="12" x2="12" y1="19" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );

  const ArrowDown = () => (
    <svg className="w-4 h-4 text-down" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="12" x2="12" y1="5" y2="19" />
      <polyline points="5 12 12 19 19 12" />
    </svg>
  );


  return (
    <div className="overflow-x-auto bg-gray-900 p-2 rounded-xl shadow-lg">
      {hasOrders ? (
        <table className="min-w-full table-auto border text-sm text-gray-200">
          <thead>
            <tr className="bg-gray-800 text-xs tracking-wider text-gray-400">
              <th className="px-2 py-2 border border-gray-700">T</th>
              <th className="px-2 py-2 border border-gray-700">PNL</th>
              <th className="px-2 py-2 border border-gray-700">Entry Price</th>
              <th className="px-2 py-2 border border-gray-700">Exit Price</th>
              <th className="px-2 py-2 border border-gray-700">Created</th>
              <th className="px-2 py-2 border border-gray-700">Closed</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="text-center border-t border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <td className="px-2 py-2 border border-gray-700 text-center">
                  {order.type === "LONG" ? <ArrowUp /> : <ArrowDown />}
                </td>

                <td
                  className={`px-2 py-2 border border-gray-700 ${order.profitLossPercent >= 0 ? "text-up" : "text-down"
                    }`}
                >
                  {Number(order.profitLoss).toFixed(2)} ({Number(order.profitLossPercent).toFixed(2)}%)
                </td>
                <td className="px-2 py-2 border border-gray-700">{Number(order.entryPrice).toFixed(2)}</td>
                <td className="px-2 py-2 border border-gray-700">{Number(order.exitPrice).toFixed(2)}</td>
                <td className="px-2 text-xs py-2 border border-gray-700">
                  {formatDateTime(order.createdTime)}
                </td>
                <td className="px-2 text-xs py-2 border border-gray-700">
                  {formatDateTime(order.closedTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-400 py-6 text-sm">No orders yet</div>
      )}
    </div>
  );
}
