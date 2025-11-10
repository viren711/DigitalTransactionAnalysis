import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import DbInsight from "../components/DbInsight";
import DbTable from "../components/DbTable";

export default function Dashboard() {
    return (
        <div className="bg-[#0e1724] flex w-screen h-screen">
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

                <div className="flex justify-between mx-4 my-10">
                    <StatCard title="Total Transations" value="2.4B" change="+8.2%" positive={true} />
                    <StatCard title="Transaction Value" value="$847B" change="+5.1%" positive={true} />
                    <StatCard title="Growth Rate" value="23.4%" change="+2.1%" positive={true} />
                    <StatCard title="Active Users" value="428M" change="-0.3%" positive={false} />
                </div>
                <div className="border border-[#273246] mx-4">
                    <DbInsight />
                </div>
                <div className="mx-4 my-10">
                    <DbTable />
                </div>
            </div>
        </div>
    )
}
