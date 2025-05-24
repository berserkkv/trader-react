import { useState } from "react";
import { createBot } from "../api/Api";

export default function AddBotForm() {
  const [form, setForm] = useState({
    symbol: "SOLUSDT",
    timeframe: "15m",
    strategy: "HA",
    capital: "100",
    leverage: "10",
    takeProfit: "3",
    stopLoss: "1"
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    try {
      const payload = {
        symbol: form.symbol,
        timeframe: form.timeframe,
        strategy: form.strategy,
        capital: parseFloat(form.capital),
        leverage: parseFloat(form.leverage),
        takeProfit: parseFloat(form.takeProfit),
        stopLoss: parseFloat(form.stopLoss),
      };

      await createBot(payload);
      setSuccess(true);
      setForm({
        symbol: "",
        timeframe: "",
        strategy: "",
        capital: "",
        leverage: "",
        takeProfit: "",
        stopLoss: ""
      });
    } catch (err) {
      console.error(err);
      setError("Failed to create bot.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-gray-200 rounded-xl mt-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Bot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="symbol" label="Symbol" value={form.symbol} onChange={handleChange} />
        <Input name="timeframe" label="Time Frame" value={form.timeframe} onChange={handleChange} />
        <Input name="strategy" label="Strategy Name" value={form.strategy} onChange={handleChange} />
        <Input name="capital" label="Initial Capital" type="number" value={form.capital} onChange={handleChange} />
        <Input name="leverage" label="Leverage" type="number" value={form.leverage} onChange={handleChange} />
        <Input name="takeProfit" label="Take Profit" type="number" value={form.takeProfit} onChange={handleChange} />
        <Input name="stopLoss" label="Stop Loss" type="number" value={form.stopLoss} onChange={handleChange} />

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
          Create Bot
        </button>

        {success && <p className="text-green-400 text-sm mt-2">Bot created successfully.</p>}
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}

function Input({ name, label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
        value={value}
        onChange={onChange}
        required
        step="any"  // important for float numbers
      />
    </div>
  );
}
