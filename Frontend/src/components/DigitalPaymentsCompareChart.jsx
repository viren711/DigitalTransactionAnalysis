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

    // Extract year columns in sorted order
    const allKeys = Object.keys(rows[0]);
    const yearColumns = allKeys.filter(k => k.includes("_")).sort();

    // Transform rows into chart format
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
        <div className="bg-[#0f172a] border border-[#273246] rounded-xl p-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">
                Digital Payments Yearly Comparison
            </h2>

            <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="mode" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />

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
