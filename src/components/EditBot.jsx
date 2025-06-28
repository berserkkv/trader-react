import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBotById, UpdateBot } from "../api/Api";

// Form default state
const initialFormState = {
    isTrailingStopActive: false,
    takeProfit: "",
    stopLoss: ""
};

export default function EditBot() {
    const { id } = useParams();
    const [bot, setBot] = useState(null);
    const [form, setForm] = useState(initialFormState);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch bot on mount
    useEffect(() => {
        const fetchBot = async () => {
            try {
                const res = await getBotById(id);
                setBot(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch bot", err);
                setLoading(false);
            }
        };

        fetchBot();
    }, [id]);

    // Populate form once bot is loaded
    useEffect(() => {
        if (bot) {
            setForm({
                isTrailingStopActive: bot.isTrailingStopActive || false,
                takeProfit: bot.takeProfit || "",
                stopLoss: bot.stopLoss || ""
            });
        }
    }, [bot]);

    // Handle form changes (text + checkbox)
    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError(null);

        try {
            const payload = {
                id: bot.id,
                takeProfit: parseFloat(form.takeProfit),
                stopLoss: parseFloat(form.stopLoss),
                isTrailingStopActive: form.isTrailingStopActive
            };

            await UpdateBot(payload);
            setSuccess(true);
            navigate("/bots/" + id);

        } catch (err) {
            console.error("Failed to update bot:", err);
            setError("Failed to update bot.");
        }
    };

    // Loading or bot not found
    if (loading) return <div className="text-gray-300">Loading bot info...</div>;
    if (!bot || bot.id === 0) {
        return (
            <div className="p-6 max-w-2xl mx-auto text-gray-200">
                <a className="underline" href="/">Back</a>
                <div className="rounded-xl mt-6 text-center text-xl">Bot not found</div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-900 text-gray-200 rounded-xl mt-6 shadow-lg">
            <a className="underline" href={`/bots/${id}`}>Back</a>
            <h2 className="text-xl font-semibold mb-4">Edit Bot</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Checkbox
                    name="isTrailingStopActive"
                    label="Enable Trailing Stop"
                    checked={form.isTrailingStopActive}
                    onChange={handleChange}
                />
                <Input
                    name="takeProfit"
                    label="Take Profit"
                    type="number"
                    value={form.takeProfit}
                    onChange={handleChange}
                />
                <Input
                    name="stopLoss"
                    label="Stop Loss"
                    type="number"
                    value={form.stopLoss}
                    onChange={handleChange}
                />

                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                    Update Bot
                </button>

                {success && <p className="text-green-400 text-sm mt-2">Bot updated successfully.</p>}
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
}

// === Input Component ===
function Input({ name, label, type = "text", value, onChange }) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm text-gray-400 mb-1">{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required
                step="any"
                className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
            />
        </div>
    );
}

// === Checkbox Component ===
function Checkbox({ name, label, checked, onChange }) {
    return (
        <div className="flex items-center space-x-2">
            <input
                id={name}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="rounded border-gray-700"
            />
            <label htmlFor={name} className="text-sm text-gray-400">{label}</label>
        </div>
    );
}
