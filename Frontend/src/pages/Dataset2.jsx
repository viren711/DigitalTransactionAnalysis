import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import EcosystemBarChart from "../components/EcosystemBarChart";
import EcosystemPieChart from "../components/EcosystemPieChart";

export default function Dataset2() {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/ecosystem")
            .then((res) => res.json())
            .then((json) => {
                setRows(json.rows);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-white p-6 text-xl">Loading dataset...</div>;
    }

    if (rows.length === 0) {
        return <div className="text-white p-6 text-xl">No data available.</div>;
    }

    const cleanedRows = rows.filter((r) => r.Description !== "Total");

    const chartData = cleanedRows.map((r) => ({
        category: r.Description,
        value: Number(String(r.Value__in_Cr__).replace(/,/g, "")),
        volume: Number(String(r.Volume__in_Mn_).replace(/,/g, "")),
    }));

    return (
        <>
            <Sidebar d2Active />
            <div className="pl-[20vw] bg-[#0e1724] flex w-screen">
                <div className="w-px h-full bg-[#242f43]"></div>

                <div className="flex-1">
                    {/* HEADER */}
                    <div className="px-5 py-4">
                        <div className="text-[35px] font-bold">
                            Ecosystem Statistics
                        </div>
                        <div className="text-[18px] text-[#9db6cb]">
                            Merchant Category Transaction Insight
                        </div>
                    </div>

                    <div className="h-px w-full bg-[#242f43]"></div>

                    {/* DATA TABLE */}
                    <div className="p-6 text-white">
                        <div className="overflow-auto border border-[#273246] rounded-lg">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#1a2433]">
                                    <tr>
                                        <th className="px-4 py-2 border-b border-[#273246]">ID</th>
                                        <th className="px-4 py-2 border-b border-[#273246]">Description</th>
                                        <th className="px-4 py-2 border-b border-[#273246]">
                                            Value (Cr)
                                        </th>
                                        <th className="px-4 py-2 border-b border-[#273246]">
                                            Volume (Mn)
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cleanedRows.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-[#273246] transition"
                                        >
                                            <td className="px-4 py-2 border-b border-[#273246]">
                                                {row.id}
                                            </td>

                                            <td className="px-4 py-2 border-b border-[#273246]">
                                                {row.Description}
                                            </td>

                                            <td className="px-4 py-2 border-b border-[#273246]">
                                                {row.Value__in_Cr__}
                                            </td>

                                            <td className="px-4 py-2 border-b border-[#273246]">
                                                {row.Volume__in_Mn_}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* CHARTS */}
                    <div className="mx-6 min-h-0">
                        <EcosystemBarChart data={chartData} top={10} />
                        <EcosystemPieChart data={chartData} mainPage={true} />
                    </div>
                </div>
            </div>
        </>
    );
}
