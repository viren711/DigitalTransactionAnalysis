import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import DbInsight from "../components/DbInsight";
import DbTable from "../components/DbTable";
// import DigitalPaymentsChart from "../components/DigitalPaymentsChart";
import { transformDigitalPayments } from "../utils/transformDigitalPayments";
import DigitalPaymentsBarChart from "../components/DigitalPaymentsBarChart";
import DigitalPaymentsPieChart from "../components/DigitalPaymentsPieChart";
import { isMobile } from "react-device-detect"


export default function Dashboard() {

    const [rawData, setRawData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [years, setYears] = useState([]);
    const [topN, setTopN] = useState(7);

    const [selectedRange, setSelectedRange] = useState("All");
    const filterOptions = ["1 Year", "3 Years", "5 Years", "All"];

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/digital_payments")
            .then((res) => res.json())
            .then((json) => {
                const { years, data } = transformDigitalPayments(json.rows);
                setYears(years);
                setRawData(data);
                setChartData(data); // initial chart = all years
            });
    }, []);

    const filterData = (range) => {
        switch (range) {
            case "1 Year":
                return rawData.slice(-1);
            case "3 Years":
                return rawData.slice(-3);
            case "5 Years":
                return rawData.slice(-5);
            case "All":
            default:
                return rawData;
        }
    };

    const getTopModes = (data, topN) => {
        if (!data.length) return data;

        const latest = data[data.length - 1];
        const modes = Object.keys(latest).filter((k) => k !== "year");

        // Get top N modes based on latest year's values
        const topModes = modes
            .map((mode) => ({ mode, value: latest[mode] }))
            .sort((a, b) => b.value - a.value)
            .slice(0, topN)
            .map((item) => item.mode);

        // Keep only top N modes in every year
        const reduced = data.map((entry) => {
            const obj = { year: entry.year };
            topModes.forEach((mode) => {
                obj[mode] = entry[mode];
            });
            return obj;
        });

        return reduced;
    };


    useEffect(() => {
        let filtered = filterData(selectedRange);
        let pieD = getTopModes(filtered, topN);
        setPieData(pieD)
        // setTopN(5)
        let reduced = getTopModes(filtered, topN);
        setChartData(reduced);
    }, [selectedRange, rawData, topN]);

    return (


        isMobile ? (
            <div className="bg-[#0e1724] w-screen overflow-x-hidden overflow-y-scroll" >
                {/* <Sidebar dbActive /> */}
                <div className="w-px h-full bg-[#242f43]"></div>

                <div className="flex-1">
                    <div className="px-5 py-4">
                        <div className="text-[35px] font-bold">
                            VishnuDTA
                        </div>
                        <div className="text-[18px] text-[#9db6cb]">
                            Tracking RBI, NPCI, and market trends
                        </div>
                    </div>
                    <div className="h-px w-full bg-[#242f43]"></div>
                    <div className="mx-2">

                        {/* <div className="flex justify-between items-center  my-2">
                            <StatCard title="Total Transations" value="2.4B" change="+8.2%" positive={true} />
                            <StatCard title="Transaction Value" value="$847B" change="+5.1%" positive={true} />
                        </div>
                        <div className="flex justify-between items-center  my-2">
                            <StatCard title="Growth Rate" value="23.4%" change="+2.1%" positive={true} />
                            <StatCard title="Active Users" value="428M" change="-0.3%" positive={false} />
                        </div> */}

                        <div className="my-5">
                            <DbTable />
                        </div>
                        <div className="border-[#273246] my-5">
                            <DbInsight options={filterOptions} selected={selectedRange} setSelected={setSelectedRange} />
                        </div>
                        <div className="mt-5 mb-10">
                            {/* <DigitalPaymentsBarChart data={chartData} /> */}
                            <DigitalPaymentsPieChart data={chartData} />
                        </div>
                    </div>
                </div>
            </div>
        )
            :
            (
                <div className="pl-[20vw] bg-[#0e1724] flex w-screen">
                    <Sidebar dbActive />
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

                        {/* <div className="flex justify-between mx-4 my-10">
                            <StatCard title="Total Transations" value="2.4B" change="+8.2%" positive={true} />
                            <StatCard title="Transaction Value" value="$847B" change="+5.1%" positive={true} />
                            <StatCard title="Growth Rate" value="23.4%" change="+2.1%" positive={true} />
                            <StatCard title="Active Users" value="428M" change="-0.3%" positive={false} />
                        </div> */}
                        <div className="border-[#273246] mx-4 mt-5">
                            <DbInsight options={filterOptions} selected={selectedRange} setSelected={setSelectedRange} />
                        </div>
                        <div className="grid grid-cols-2 gap-6 mx-4">
                            <DigitalPaymentsBarChart data={chartData} />
                            <DigitalPaymentsPieChart data={pieData} />
                        </div>

                        <div className="mx-4 my-10">
                            <DbTable />
                        </div>
                    </div>
                </div>
            )

    )

}
