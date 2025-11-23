import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function PredictionsPage() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/digital_payments_with_25_preds")
            .then(res => res.json())
            .then(json => {
                setRows(json.rows);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-white p-6 text-xl">Loading...</div>;
    }

    const sample = rows[0];

    const yearCols = Object.keys(sample)
        .filter((k) => /^\d{4}_\d{4}$/.test(k))
        .sort();

    const predCols = Object.keys(sample)
        .filter((k) => k.includes("pred"))
        .sort();

    const futureCols = Object.keys(sample)
        .filter((k) => k === "2025_2026");

    const columns = ["Mode", ...yearCols, ...predCols, ...futureCols];

    return (

        <div className="pl-[20vw] bg-[#0e1724] min-h-screen w-screen flex">
            <Sidebar predActive />

            <div className="w-px h-full bg-[#242f43]"></div>

            <div className="flex-1">
                <div className="px-5 py-4">
                    <div className="text-[35px] font-bold">
                        Digital Payments Predictions
                    </div>
                    <div className="text-[18px] text-[#9db6cb]">
                        Tracking RBI, NPCI, and market trends
                    </div>
                </div>
                <div className="h-px w-full bg-[#242f43]"></div>

                <table className="w-full text-left rounded-lg mx-6 mt-6">
                    <thead className="bg-[#1a2433]">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className="px-5 py-4 border-[#273246]"
                                >
                                    {col.replace(/_/g, " ")}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, rIndex) => (
                            <tr
                                key={rIndex}
                                className="hover:bg-[#273246] transition px-6"
                            >
                                {columns.map((col, cIndex) => (
                                    <td
                                        key={cIndex}
                                        className="px-5 py-2 border-b border-[#273246]"
                                    >
                                        {typeof row[col] === "number"
                                            ? row[col].toLocaleString(undefined, { maximumFractionDigits: 2 })
                                            : row[col]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
