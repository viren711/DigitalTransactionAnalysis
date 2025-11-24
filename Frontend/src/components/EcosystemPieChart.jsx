import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function EcosystemPieChart({ data, mainPage = false }) {
    if (!data.length) return null;

    const top7 = [...data]
        .sort((a, b) => b.value - a.value)
        .slice(0, 7);

    const pieData = top7.map((item) => ({
        name:
            item.category.length > 30
                ? item.category.substring(0, 30) + "..."
                : item.category,
        fullName: item.category,
        value: item.value
    }));

    const colors = [
        "#f97316", "#2563eb", "#22c55e",
        "#eab308", "#ec4899", "#8b5cf6",
        "#14b8a6"
    ];

    return (
        <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 mx-2 mt-6 min-h-0">
            <h2 className="text-lg font-semibold text-white mb-4">
                Top 7 Merchant Categories by Transaction Value
            </h2>

            <div className="h-[480px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={`${mainPage ? 200 : 150}`}
                            startAngle={45}
                            endAngle={405}
                            label={({ value }) => value.toLocaleString()}
                        >
                            {pieData.map((_, idx) => (
                                <Cell key={idx} fill={colors[idx % colors.length]} />
                            ))}
                        </Pie>

                        {/* Same as digital payments */}
                        <Tooltip
                            formatter={(value, _, entry) => [
                                `${value.toLocaleString()} Cr`,
                                entry.payload.name
                            ]} contentStyle={{ background: "#ffffff", borderRadius: "8px" }}
                            labelStyle={{ color: "#fff" }} />
                        {
                            mainPage ?
                                <Legend layout="vertical" align="right" verticalAlign="middle" /> :
                                <Legend />
                        }

                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
