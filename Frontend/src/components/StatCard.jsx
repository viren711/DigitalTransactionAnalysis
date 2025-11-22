import { isMobile } from "react-device-detect"

export default function StatCard({ title, value, change, positive }) {
    return (
        isMobile ? (
            <div className="bg-[#0e1722] border border-[#273246] rounded-[5px] w-[49%] h-50 mx-2 my-2">
                <div className="text-[#242f43] text-[18px] mx-4 my-2">
                    {title}
                </div>
                <div className="text-white text-[30px] font-bold mx-4 my-2">
                    {value}
                </div>
                <div className={`${positive ? "bg-[#19a249]" : "bg-red-500"} rounded-[5px] text-[12px] text-black w-fit mx-4 my-2 px-2 py-2`}>
                    {change}
                </div>
            </div>
        ) :
            (
                <div className="bg-[#0e1722] border border-[#273246] rounded-[5px] w-[25%] mx-2">
                    <div className="text-[#242f43] text-[18px] mx-4 my-2">
                        {title}
                    </div>
                    <div className="text-white text-[30px] font-bold mx-4 my-2">
                        {value}
                    </div>
                    <div className={`${positive ? "bg-[#19a249]" : "bg-red-500"} rounded-[5px] text-[12px] text-black w-fit mx-4 my-2 px-2 py-2`}>
                        {change}
                    </div>
                </div>
            )
    )
}