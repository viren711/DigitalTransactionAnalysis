import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DigitalPaymentsCompareChart from "../components/DigitalPaymentsCompareChart";
import DigitalPaymentsLineChart from "../components/DigitalPaymentsLineChart";

export default function Dataset1() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/digital_payments")
            .then(res => res.json())
            .then(json => {
                setRows(json.rows);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-white p-6 text-xl">Loading dataset...</div>;
    }
    if (rows.length === 0) {
        return (
            <div className="text-white text-xl p-6">
                No data available.
            </div>
        );
    }


    return (<>
        <Sidebar d1Active />
        <div className="pl-[20vw] bg-[#0e1724] flex w-screen">
            <div className="w-px h-full bg-[#242f43]"></div>

            <div className="flex-1">
                <div className="px-5 py-4">
                    <div className="text-[35px] font-bold">
                        Digital Transaction Analysis
                    </div>
                    <div className="text-[18px] text-[#9db6cb]">
                        Tracking RBI, NPCI, and market trends
                    </div>
                </div>
                <div className="h-px w-full bg-[#242f43]"></div>
                <div className="p-6 text-white">

                    <div className="overflow-auto border border-[#273246] rounded-lg">

                        {(() => {
                            // Get all keys
                            const allKeys = Object.keys(rows[0]);

                            // Extract year columns and sort them
                            const yearCols = allKeys
                                .filter((k) => k.includes("_")) // years like 2018_2019
                                .sort(); // chronological order

                            // Final correct order of columns
                            const columns = ["id", "Mode", ...yearCols];

                            return (
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[#1a2433]">
                                        <tr>
                                            {columns.map((col, index) => (
                                                <th
                                                    key={index}
                                                    className="px-4 py-2 border-b border-[#273246]"
                                                >
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {rows.map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className="hover:bg-[#273246] transition"
                                            >
                                                {columns.map((col, colIndex) => (
                                                    <td
                                                        key={colIndex}
                                                        className="px-4 py-2 border-b border-[#273246]"
                                                    >
                                                        {typeof row[col] === "number"
                                                            ? row[col].toLocaleString()
                                                            : row[col]}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            );
                        })()}
                    </div>
                </div>
                <DigitalPaymentsCompareChart rows={rows} />
                <DigitalPaymentsLineChart rows={rows} />

            </div>
        </div>
    </>);
}