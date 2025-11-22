import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function DigitalPaymentsPieChart({ data }) {
    if (!data.length) return null;

    // ALWAYS use the final year from the filtered data
    const latest = data[data.length - 1];

    const modes = Object.keys(latest).filter((key) => key !== "year");

    const pieData = modes.map((mode) => ({
        name: mode,
        value: latest[mode]
    }));

    const colors = [
        "#f97316", "#2563eb", "#22c55e", "#eab308",
        "#ec4899", "#8b5cf6", "#14b8a6", "#ef4444"
    ];

    return (
        <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 mx-2 mt-6">
            <h2 className="text-lg font-semibold text-white mb-4">
                Payment Mode Breakdown ({latest.year})
            </h2>

            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={150}
                            startAngle={45}
                            endAngle={405}
                            label
                        >
                            {pieData.map((_, idx) => (
                                <Cell key={idx} fill={colors[idx % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
