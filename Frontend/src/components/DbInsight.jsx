import { useState } from "react";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

export default function DbInsight({ filter = false, options = [], selected, setSelected }) {
    const navigate = useNavigate()

    return (
        <div className="border-[#273246] mx-2">
            <div className="flex justify-between">
                <div className={`${filter ? "block" : "hidden"}`}>
                    <Dropdown options={options}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    {/* <button className="mx-2 bg-[#1e293b] text-[#c8d7e5]">Reset</button>
                    <button className="mx-2 rounded-[5px] bg-[#3fa2ff] text-[#032034]">Apply</button> */}
                </div>
                <div className="flex justify-around">

                    <div className="mx-1">
                        <button className="rounded-[5px] bg-[#3fa2ff] text-[#032034]" onClick={() => { navigate('/dataset1') }}>View Dataset 1</button>
                    </div>
                    {/* <div className="mx-1">
                        <button className="rounded-[5px] bg-[#3fa2ff] text-[#032034]" onClick={() => { navigate('/dataset2') }}>View Dataset 2</button>
                    </div> */}
                    {/* <div className="mx-1">
                        <button className="rounded-[5px] bg-[#3fa2ff] text-[#032034]" onClick={() => { navigate('/dataset3') }}>View Dataset 3</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}