import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect"
import { buildInsights } from "../utils/buildInsights";

export default function DbTable() {
    // const tableData = [
    //     { date: "2024-11-10", source: "RBI Weekly Report", metric: "Total Transactions", value: "1.2B", change: "+8.5%" },
    //     { date: "2024-11-09", source: "NPCI Data", metric: "UPI Transactions", value: "850M", change: "+12.3%" },
    //     { date: "2024-11-08", source: "RBI Analysis", metric: "Card Transactions", value: "250M", change: "+3.2%" },
    //     { date: "2024-11-07", source: "Annual Report", metric: "Digital Penetration", value: "68.5%", change: "+5.1%" },
    //     { date: "2024-11-06", source: "Market Data", metric: "Payment Value", value: "$125B", change: "+11.7%" },
    // ]

    const [insights, setInsights] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/digital_payments")
            .then(res => res.json())
            .then(json => {
                const tableData = buildInsights(json.rows);
                setInsights(tableData);
            });
    }, []);
    return (
        isMobile ? (

            <div className="text-center rounded-[10px] overflow-hidden border border-[#273246] mx-2">
                <table className="w-full">
                    <thead className="bg-[#1e293b] hover:cursor-default transition-colors">
                        <tr>
                            {/* <th className="py-3 px-1 ">Date</th> */}
                            {/* <th className="py-3 px-1">Source</th> */}
                            <th className="py-3">Transaction Type</th>
                            <th className="py-3 px-3">Value</th>
                            <th className="py-3 px-3">Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insights.map((row, index) => (
                            <tr key={index} className="border-t border-[#273246] hover:bg-[#1b2535] hover:cursor-default transition-colors">
                                {/* <td className="py-3 px-1 border-b border-[#273246]">{row.date}</td> */}
                                {/* <td className="py-3 px-1 border-b border-[#273246]">{row.source}</td> */}
                                <td className="py-3 border-b border-[#273246]">{row.metric}</td>
                                <td className="py-3 px-3 border-b border-[#273246]">{row.value}</td>
                                <td className="py-3 px-3 border-b border-[#273246]">{row.change}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (<div className="text-center rounded-[10px] overflow-hidden border border-[#273246] mx-2">
            <table className="w-full">
                <thead className="bg-[#1e293b] hover:cursor-default transition-colors">
                    <tr>
                        <th className="py-3 ">Date</th>
                        <th className="py-3">Source</th>
                        <th className="py-3">Metric</th>
                        <th className="py-3">Value</th>
                        <th className="py-3">Change</th>
                    </tr>
                </thead>
                <tbody>
                    {insights.map((row, index) => (
                        <tr key={index} className="border-t border-[#273246] hover:bg-[#1b2535] hover:cursor-default transition-colors">
                            <td className="py-3 border-b border-[#273246]">{row.date}</td>
                            <td className="py-3 border-b border-[#273246]">{row.source}</td>
                            <td className="py-3 border-b border-[#273246]">{row.metric}</td>
                            <td className="py-3 border-b border-[#273246]">{row.value}</td>
                            <td className="py-3 border-b border-[#273246]">{row.change}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
    )
}