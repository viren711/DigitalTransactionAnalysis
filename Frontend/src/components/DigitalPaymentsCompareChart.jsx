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

export default function DigitalPaymentsCompareChart({ rows }) {
    if (!rows || rows.length === 0) return null;

    const allKeys = Object.keys(rows[0]);
    const yearColumns = allKeys.filter(k => k.includes("_")).sort();

    const chartData = rows.map(row => {
        const obj = { mode: row.Mode };
        yearColumns.forEach(yr => {
            obj[yr] = Number(row[yr]);
        });
        return obj;
    });

    const colors = [
        "#f97316", "#2563eb", "#22c55e", "#eab308",
        "#ec4899", "#8b5cf6", "#14b8a6", "#ef4444"
    ];

    return (
        <div className="bg-[#0f172a] border border-[#273246] rounded-xl p-6 mx-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">
                Digital Payments Yearly Comparison
            </h2>

            <div className="h-[550px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 60, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="mode" stroke="#94a3b8" tick={{ fontSize: 12 }} label={{
                            value: "Mode",
                            dy: 20,
                            position: "insideCenter",
                            fill: "#94a3b8"
                        }} />
                        <YAxis stroke="#94a3b8"
                            tickFormatter={(v) => `${v} Cr`}
                            label={{
                                value: "Transactions Volume (Cr)",
                                dx: -60,
                                position: "insideCenter",
                                angle: -90,
                                fill: "#94a3b8"
                            }} />
                        <Tooltip
                            formatter={(v) =>
                                typeof v === "number" ? `${v.toFixed(2)} Cr` : v
                            }
                            contentStyle={{
                                background: "#1e293b",
                                borderRadius: "8px"
                            }}
                            labelStyle={{ color: "#fff" }} />
                        <Legend
                            verticalAlign="top"
                            align="center"
                            wrapperStyle={{ paddingBottom: 16 }}
                            iconType="circle"
                            formatter={(value) => (
                                <span style={{ fontSize: 11 }}>{value}</span>
                            )}
                        />

                        {yearColumns.map((year, idx) => (
                            <Bar
                                key={year}
                                dataKey={year}
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
