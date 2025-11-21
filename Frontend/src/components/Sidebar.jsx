// import { Link, useLocation } from "react-router-dom"

export default function Sidebar({ dbActive = false, insActive = false, compActive = false }) {
    // const location = useLocation()

    return (
        <div className="bg-[#0d1320] text-[#9db6cb] h-screen w-[20vw] px-5 py-5">
            <div className="font-poppins text-center text-[35px] px-3 py-1 font-bold  border-[#242f43] rounded-[5px]">
                VishnuDTA
            </div>
            <div className=" my-8 p-0">
                <div className={`${dbActive ? "bg-[#153246] text-[#d0efff]" : ""} hover:bg-[#153246] hover:text-[#d0efff] border border-[#242f43] rounded-[5px] my-3 px-4 py-4`}>
                    Dashboard
                </div>
                <div className={`${insActive ? "bg-[#153246] text-[#d0efff]" : ""} hover:bg-[#153246] hover:text-[#d0efff] border border-[#242f43] rounded-[5px] my-3 px-4 py-4`}>
                    Insights
                </div>
                <div className={`${compActive ? "bg-[#153246] text-[#d0efff]" : ""} hover:bg-[#153246] hover:text-[#d0efff] border border-[#242f43] rounded-[5px] my-3 px-4 py-4`}>
                    Comparison Charts
                </div>
            </div>
        </div>
    )
}