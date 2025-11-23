import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

export default function BankwiseLineChart({ rows }) {
    const [selectedYear, setSelectedYear] = useState(null);
    const [chartData, setChartData] = useState([]);

    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Extract unique years
    const years = [...new Set(rows.map((r) => r.Year))].sort();

    useEffect(() => {
        if (!selectedYear && years.length > 0) {
            setSelectedYear(years[0]); // default = first year
        }
    }, [years]);

    useEffect(() => {
        if (!selectedYear) return;

        // Filter banks for selected year only
        const yearRows = rows.filter((r) => r.Year === selectedYear);

        // Restructure into month-wise rows for the chart
        const formatted = MONTHS.map((month) => {
            const entry = { month };

            yearRows.forEach((bankRow) => {
                const rawValue = bankRow[month] || 0;
                const crValue = Number(rawValue / 1_00_00_000).toFixed(2); // convert to Crores
                entry[bankRow.Bank_Name] = Number(crValue);
            });

            return entry;
        });

        setChartData(formatted);
    }, [selectedYear, rows]);

    const COLORS = [
        "#f97316", "#2563eb", "#22c55e", "#eab308", "#ec4899",
        "#8b5cf6", "#14b8a6", "#ef4444", "#0ea5e9", "#6366f1"
    ];

    return (
        <div className="bg-[#0f172a] border border-[#273246] rounded-xl p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                    Bankwise Monthly Trend (UPI)
                </h2>

                {/* YEAR FILTER */}
                <select
                    value={selectedYear || ""}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="bg-[#1e293b] text-white px-3 py-1 rounded"
                >
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            <div className="h-[550px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

                        <XAxis
                            dataKey="month"
                            tick={{ fill: "#cbd5e1", fontSize: 12 }}
                            label={{
                                value: "Months",
                                position: "insideBottom",
                                offset: -5,
                                fill: "#94a3b8"
                            }}
                        />

                        <YAxis
                            tick={{ fill: "#cbd5e1", fontSize: 12 }}
                            label={{
                                value: "Transactions (Cr)",
                                angle: -90,
                                position: "insideCenter",
                                fill: "#94a3b8"
                            }}
                        />

                        <Tooltip
                            contentStyle={{ background: "#1e293b", borderRadius: "8px" }}
                            labelStyle={{ color: "#fff" }}
                            formatter={(val) => `${val} Cr`}
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

                        {rows
                            .filter((r) => r.Year === selectedYear)
                            .map((r, i) => (
                                <Line
                                    key={r.Bank_Name}
                                    type="monotone"
                                    dataKey={r.Bank_Name}
                                    stroke={COLORS[i % COLORS.length]}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}
