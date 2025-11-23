import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function EcosystemBarChart({ data, top }) {
    if (!data || data.length === 0) return null;

    // STEP 1 — sort by value & pick TOP 10
    const top10 = [...data]
        .sort((a, b) => b.value - a.value)
        .slice(0, top);

    // FIXED: use top10 instead of top7, and include value
    const barData = top10.map((item) => ({
        name:
            item.category.length > 30
                ? item.category.substring(0, 30) + "..."
                : item.category,
        value: item.value  // <-- REQUIRED for the bar chart
    }));

    return (
        <div className="bg-[#0f172a] p-6 border border-[#273246] rounded-xl mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">
                Top {top} Categories by Transaction Value (₹ Crores)
            </h2>

            <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={barData}
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" stroke="#334155" /> */}

                        {/* Category Labels */}
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={200}
                            tick={{ fill: "#cbd5e1", fontSize: 12 }}
                            label={{
                                value: "Categories",
                                angle: -90,
                                dx: -70,
                                position: "insideCenter",
                                fill: "#94a3b8"
                            }}
                        />

                        {/* Numeric Axis */}
                        <XAxis
                            type="number"
                            stroke="#94a3b8"
                            tick={{ fontSize: 12 }}
                            label={{
                                value: "Transactions Volume (Cr)",
                                dy: 15,
                                position: "insideCenter",
                                fill: "#94a3b8"
                            }}
                        />

                        <Tooltip
                            contentStyle={{ background: "#1e293b", borderRadius: "8px" }}
                            labelStyle={{ color: "#fff" }}
                        />

                        <Bar
                            dataKey="value"
                            fill="#3b82f6"
                            radius={[1, 6, 6, 1]}
                            maxBarSize={45}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
