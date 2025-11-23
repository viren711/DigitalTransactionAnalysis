import Sidebar from "../components/Sidebar";

export default function Dataset2() {
    return (<>
        <Sidebar d2Active />
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
            </div>
        </div>
    </>);
}