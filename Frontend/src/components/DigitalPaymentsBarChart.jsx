import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function DigitalPaymentsBarChart({ data }) {
    if (!data.length) return null;

    const modes = Object.keys(data[0]).filter((key) => key !== "year");

    const colors = [
        "#f97316", "#2563eb", "#22c55e", "#eab308",
        "#ec4899", "#8b5cf6", "#14b8a6", "#ef4444"
    ];

    return (
        <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 mx-2 mt-6">
            <h2 className="text-lg font-semibold text-white mb-4">
                Digital Payments (Bar Chart)
            </h2>

            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="year" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />

                        {modes.map((mode, idx) => (
                            <Bar
                                key={mode}
                                dataKey={mode}
                                fill={colors[idx % colors.length]}
                                radius={[4, 4, 0, 0]}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
