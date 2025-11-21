// import { Link, useLocation } from "react-router-dom"

const BASE = import.meta.env.DEV ? 'http://127.0.0.1:5000' : 'https://your-production-domain.com';

export default function Sidebar({
    dbActive = false,
    insActive = false,
    compActive = false,
}) {

    // Button click handler (calls Flask backend)
    async function handleComparisonClick() {
        try {
            const response = await fetch(`${BASE}/api/compare`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({ message: "run comparison" }),
            });

            const data = await response.json();
            console.log("Flask Response:", data);
            alert("Comparison completed! Check console for data.");
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to run comparison.");
        }
    }

    return (
        <div className="bg-[#0d1320] text-[#9db6cb] h-screen w-[20vw] px-5 py-5">
            <div className="font-poppins text-center text-[35px] px-3 py-1 font-bold border-[#242f43] rounded-[5px]">
                VishnuDTA
            </div>

            <div className="my-8 p-0">

                <div
                    className={`${dbActive ? "bg-[#153246] text-[#d0efff]" : ""} 
                        hover:bg-[#153246] hover:text-[#d0efff] border border-[#242f43] 
                        rounded-[5px] my-3 px-4 py-4`}
                >
                    Dashboard
                </div>

                <div
                    className={`${insActive ? "bg-[#153246] text-[#d0efff]" : ""} 
                        hover:bg-[#153246] hover:text-[#d0efff] border border-[#242f43] 
                        rounded-[5px] my-3 px-4 py-4`}
                >
                    Insights
                </div>

                {/* COMPARISON CHARTS with button */}
                <div
                    className={`${compActive ? "bg-[#153246] text-[#d0efff]" : ""} 
                        hover:bg-[#153246] hover:text-[#d0efff] border border-[#242f43] 
                        rounded-[5px] my-3 px-4 py-4 flex justify-between items-center`}
                >
                    <span>Comparison Charts</span>

                    <button
                        onClick={handleComparisonClick}
                        className="bg-[#1c4463] hover:bg-[#255b82] text-white px-3 py-1 rounded"
                    >
                        Run
                    </button>
                </div>

            </div>
        </div>
    );
}
