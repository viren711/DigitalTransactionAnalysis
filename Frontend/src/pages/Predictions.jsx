import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PredictionsLineChart from "../components/PredictionsLineChart";
import image from "../static/image1.jpeg"

export default function PredictionsPage() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMode, setSelectedMode] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/digital_payments_with_25_preds")
            .then(res => res.json())
            .then(json => {
                setRows(json.rows);
                setSelectedMode(json.rows[0].Mode);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-white p-6 text-xl">Loading...</div>;
    }

    const sample = rows[0];

    let yearCols = Object.keys(sample)
        .filter((k) => /^\d{4}_\d{4}$/.test(k))
        .sort()
        .filter((k) => k !== "2025_2026");

    const predCols = Object.keys(sample)
        .filter((k) => k.includes("pred"))
        .sort();

    const futureCols = ["2025_2026"]; // ALWAYS one, always last

    const columns = ["Mode", ...yearCols, ...predCols, ...futureCols];

    return (
        <div className="pl-[20vw] bg-[#0e1724] min-h-screen w-screen flex">
            <Sidebar predActive />

            <div className="w-px h-full bg-[#242f43]"></div>

            <div className="flex-1">
                <div className="px-5 py-4">
                    <div className="text-[35px] font-bold">Digital Payments Predictions</div>
                    <div className="text-[18px] text-[#9db6cb]">
                        Tracking RBI, NPCI, and future trends
                    </div>
                </div>

                <div className="h-px w-full bg-[#242f43]"></div>



                <div className="overflow-auto border border-[#273246] rounded-lg mx-6 mt-4">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#1a2433]">
                            <tr>
                                {columns.map((col, idx) => (
                                    <th
                                        key={idx}
                                        className="px-4 py-2 border-b border-[#273246] whitespace-normal break-words"
                                    >
                                        {col.replace(/_/g, " ")}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((row, rIndex) => (
                                <tr key={rIndex} className="hover:bg-[#273246] transition">
                                    {columns.map((col, cIndex) => (
                                        <td
                                            key={cIndex}
                                            className="px-4 py-2 border-b border-[#273246] whitespace-normal break-words"
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
                <div className="mx-6 mt-6 text-white">
                    <select
                        value={selectedMode}
                        onChange={(e) => setSelectedMode(e.target.value)}
                        className="bg-[#0e172a] border border-[#273246] px-4 py-2 rounded"
                    >
                        {rows.map((r, idx) => (
                            <option key={idx} value={r.Mode}>{r.Mode}</option>
                        ))}
                    </select>
                </div>
                <PredictionsLineChart rows={rows} selectedMode={selectedMode} />
                <div className="bg-[#0f172a] p-6 mt-6 mx-6 rounded-xl border border-[#273246]">
                    <div className="flex justify-center">
                        <img
                            src={image}
                            alt="Preview"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
