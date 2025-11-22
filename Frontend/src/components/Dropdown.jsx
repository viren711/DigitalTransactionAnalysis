import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

export default function Dropdown({ options = [], selected, setSelected }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div className="relative text-center w-full ">
            <button
                className="flex w-40 justify-between items-center bg-[#0e1722] border border-[#273246] text-center text-white rounded-[5px] px-4 py-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="w-30">{selected}</span>
                <ChevronDownIcon
                    className={`ml-3 w-5 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute w-full rounded-[5px] bg-[#0e1722] border border-[#273246] text-white z-20 mt-2">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(option)}
                            className={`cursor-pointer ${option === selected
                                ? "bg-[#153246] text-[#d0efff]"
                                : "bg-[#0e1722] text-[#9db6cb]"
                                } hover:bg-[#153246] hover:text-[#d0efff] transition-colors px-4 py-2 text-center`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
