import { useState } from "react";
import Dropdown from "./Dropdown";

export default function DbInsight({ options = [], selected, setSelected }) {


    return (
        <div className="border-[#273246] mx-2">
            <div className="flex justify-between">
                <div className="flex">
                    <Dropdown options={options}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    {/* <button className="mx-2 bg-[#1e293b] text-[#c8d7e5]">Reset</button>
                    <button className="mx-2 rounded-[5px] bg-[#3fa2ff] text-[#032034]">Apply</button> */}
                </div>
                <div className="">
                    <button className="rounded-[5px] bg-[#3fa2ff] text-[#032034]">View Insights</button>
                </div>
            </div>
        </div>
    )
}