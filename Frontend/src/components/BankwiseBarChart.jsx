import { useState, useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

export default function BankWiseBarChart({ rows }) {
    const [selectedYear, setSelectedYear] = useState("2025");

    // get year options dynamically
    const years = [...new Set(rows.map(r => r.Year))].sort();

    // months that exist in the dataset
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // convert dataset → bar data per bank
    const chartData = useMemo(() => {
        return rows
            .filter(r => r.Year == selectedYear)
            .map(r => {
                let total = 0;

                months.forEach(m => {
                    if (typeof r[m] === "number") total += r[m];
                });

                return {
                    bank: r.Bank_Name,
                    total
                };
            })
            .sort((a, b) => b.total - a.total); // high → low
    }, [selectedYear, rows]);


    return (
        <div className="bg-[#0f172a] border border-[#273246] rounded-xl p-6 mx-6 my-4">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-white">
                    Bank-wise UPI Transactions ({selectedYear})
                </h2>

                {/* Year Filter */}
                <select
                    className="bg-[#1e293b] text-white px-3 py-2 rounded-md border border-[#334155]"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {years.map((y, idx) => (
                        <option key={idx} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            {/* Scroll container */}
            <div className="w-full overflow-x-hidden h-[550px]" >
                <ResponsiveContainer width="95%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 30, right: 30, left: 80, bottom: 90 }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" stroke="#334155" /> */}

                        <XAxis
                            dataKey="bank"
                            angle={-45}
                            textAnchor="end"
                            interval={0}
                            tick={{ fill: "#cbd5e1", fontSize: 12 }}
                        />

                        <YAxis
                            tick={{ fill: "#cbd5e1", fontSize: 12 }}
                            tickFormatter={(v) => (v / 10000000).toFixed(2) + " Cr"}
                        />

                        <Tooltip
                            formatter={(v) => (v / 10000000).toFixed(2) + " Cr"}
                            contentStyle={{ background: "#1e293b", borderRadius: "8px" }}
                            labelStyle={{ color: "#fff" }}
                        />

                        <Bar dataKey="total" fill="#3b82f6" maxBarSize={75} radius={[6, 6, 1, 1]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
