import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BankwiseBarChart from "../components/BankwiseBarChart";
import BankwiseLineChart from "../components/BankwiseLineChart";

export default function Dataset3() {
    const [rows, setRows] = useState([]);
    const [processedRows, setProcessedRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/bankwise_top10_upi")
            .then(res => res.json())
            .then(json => {
                setRows(json.rows)
                const processed = transformBankWise(json.rows);
                setProcessedRows(processed);
                setLoading(false)
            });
    }, []);

    function transformBankWise(rows) {
        const monthKeys = [
            "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
        ];

        return rows.map(row => {
            // Sum all month values (ignore missing ones)
            const total = monthKeys.reduce((sum, m) => {
                const val = Number(row[m]) || 0;
                return sum + val;
            }, 0);

            return {
                Year: row.Year,
                Bank: row.Bank_Name,
                Total: total
            };
        });
    }


    if (loading) {
        return <div className="text-white text-xl p-6">Loading data...</div>;
    }

    if (!rows.length) {
        return <div className="text-white text-xl p-6">No data available.</div>;
    }

    // 1. Extract full list of columns
    const allKeys = Object.keys(rows[0]);

    // 2. Remove 'id'
    const cleanedKeys = allKeys.filter(k => k !== "id");

    // 3. Order columns: Bank_Name → Year → Jan → Feb → ... → Dec
    const monthOrder = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const columns = [
        "Bank_Name",
        "Year",
        ...monthOrder.filter(m => cleanedKeys.includes(m))
    ];

    return (
        <div className="pl-[20vw] bg-[#0e1724] min-h-screen w-screen flex">
            <Sidebar d3Active />

            <div className="w-px h-full bg-[#242f43]"></div>

            <div className="flex-1">
                <div className="px-5 py-4">
                    <div className="text-[35px] font-bold">
                        Bank Wise UPI Transactions
                    </div>
                    <div className="text-[18px] text-[#9db6cb]">
                        Tracking RBI, NPCI, and market trends
                    </div>
                </div>
                <div className="h-px w-full bg-[#242f43]"></div>

                <div className="p-6 text-white">

                    <div className="overflow-auto border border-[#273246] rounded-lg">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#1a2433]">
                                <tr>
                                    <th className="px-4 py-2 border-b border-[#273246]">Year</th>
                                    <th className="px-4 py-2 border-b border-[#273246]">Bank Name</th>
                                    <th className="px-4 py-2 border-b border-[#273246]">Total Value (Cr)</th>
                                </tr>
                            </thead>

                            <tbody>
                                {processedRows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-[#273246] transition">
                                        <td className="px-4 py-2 border-b border-[#273246]">{row.Year}</td>
                                        <td className="px-4 py-2 border-b border-[#273246]">{row.Bank}</td>
                                        <td className="px-4 py-2 border-b border-[#273246]">
                                            {(row.Total / 10000000).toFixed(2)} Cr
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
                <BankwiseBarChart rows={rows} />
                <BankwiseLineChart rows={rows} />
            </div>
        </div>
    );
}
