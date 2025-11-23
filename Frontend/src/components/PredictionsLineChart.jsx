import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function PredictionsLineChart({ rows, selectedMode }) {
    if (!rows || rows.length === 0 || !selectedMode) return null;

    const row = rows.find((r) => r.Mode === selectedMode);
    if (!row) return null;

    const yearCols = Object.keys(row)
        .filter((k) => /^\d{4}_\d{4}$/.test(k))
        .sort()
        .filter(k => k !== "2025_2026");

    const linearPred = "2024_2025_linear_pred";
    const polyPred = "2024_2025_poly_pred";
    const futureCol = "2025_2026";

    const chartData = [
        ...yearCols.map(y => ({
            year: y.replace("_", "-"),
            actual: Number(row[y]) || null,
            linear: null,
            poly: null,
            future: null
        })),
        {
            year: "2024-2025 (Linear)",
            actual: null,
            linear: Number(row[linearPred]),
            poly: null,
            future: null
        },
        {
            year: "2024-2025 (Poly)",
            actual: null,
            linear: null,
            poly: Number(row[polyPred]),
            future: null
        },
        {
            year: "2025-2026",
            actual: null,
            linear: null,
            poly: null,
            future: Number(row[futureCol])
        }
    ];

    return (
        <div className="bg-[#0f172a] border border-[#273246] rounded-xl p-6 mt-8 mx-6">
            <h2 className="text-xl font-semibold text-white mb-4">
                Prediction Trend — {selectedMode}
            </h2>

            <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 30, right: 30, left: 30, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                        <XAxis
                            dataKey="year"
                            stroke="#94a3b8"
                            tick={{ fontSize: 12 }}
                            label={{
                                value: "Years",
                                dy: 20,
                                position: "insideCenter",
                                fill: "#94a3b8"
                            }}
                        />

                        <YAxis
                            stroke="#94a3b8"
                            tickFormatter={(v) => `${v} Cr`}
                            width={100}
                            // angle={-45}
                            label={{
                                value: "Transactions (Cr)",
                                angle: -90,
                                dx: -40,
                                position: "insideCenter",
                                fill: "#94a3b8"
                            }}
                        />

                        <Tooltip
                            formatter={(v) =>
                                typeof v === "number" ? `${v.toFixed(2)} Cr` : v
                            }
                            contentStyle={{
                                background: "#1e293b",
                                borderRadius: "8px"
                            }}
                            labelStyle={{ color: "#fff" }}
                        />

                        <Legend
                            verticalAlign="top"
                            align="center"
                            wrapperStyle={{ paddingBottom: 16 }}
                            iconType="circle"
                            formatter={(value) => (
                                <span style={{ fontSize: 11 }}>{value}</span>
                            )}
                        />

                        <Line
                            type="monotone"
                            dataKey="actual"
                            name="Actual Values"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="linear"
                            name="Linear Prediction"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="poly"
                            name="Polynomial Prediction"
                            stroke="#eab308"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="future"
                            name="2025–2026 Projection"
                            stroke="#ec4899"
                            strokeWidth={3}
                            dot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
