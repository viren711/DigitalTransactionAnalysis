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

export default function DigitalPaymentsLineChart({ rows }) {
    if (!rows || rows.length === 0) return null;

    // Extract all fields and detect year columns dynamically
    const allKeys = Object.keys(rows[0]);
    const yearColumns = allKeys.filter((k) => k.includes("_")).sort();

    // Transform rows (Mode → Year Series)
    // Final format example:
    // { year: "2018_2019", BHIM UPI: 5000, NEFT: 200, IMPS: 300 }
    const chartData = yearColumns.map((year) => {
        const entry = { year };
        rows.forEach((row) => {
            entry[row.Mode] = Number(row[year]);
        });
        return entry;
    });

    // Chart color palette
    const colors = [
        "#f97316", "#2563eb", "#22c55e", "#eab308",
        "#ec4899", "#8b5cf6", "#14b8a6", "#ef4444",
        "#06b6d4", "#c026d3", "#dc2626", "#4f46e5"
    ];

    return (
        <div className="bg-[#0f172a] border border-[#273246] rounded-xl p-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">
                Digital Payments Line Chart (Yearly Trends)
            </h2>

            <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis
                            dataKey="year"
                            stroke="#94a3b8"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                            formatter={(v) =>
                                typeof v === "number" ? `${v.toFixed(2)} Cr` : v
                            }
                            contentStyle={{
                                background: "#1e293b",
                                borderRadius: "8px"
                            }}
                            labelStyle={{ color: "#fff" }} />
                        <Legend />

                        {rows.map((row, idx) => (
                            <Line
                                key={row.Mode}
                                type="monotone"
                                dataKey={row.Mode}
                                stroke={colors[idx % colors.length]}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
