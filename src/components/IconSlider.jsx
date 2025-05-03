import { FaMinus, FaPlus } from "react-icons/fa6";

export default function IconSlider({ min = 0, max = 100, value, onChange }) {

     const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="p-1 bg-[#2c2b35] rounded-full border-2 border-[#646179] text-yellow-400 hover:bg-stone-800 transition cursor-pointer"
      >
        <FaMinus size={12} />
      </button>

      <div className="relative flex-1 h-4.5">
        <div
          className="absolute -top-6 transform -translate-x-1/2 text-yellow-400 text-sm font-semibold pointer-events-none bg-black px-4 rounded-full border-3 border-gray-400"
          style={{ left: `${percent}%` }}
        >
          {value}
        </div>
        <div className=" h-2 bg-stone-700 rounded-full overflow-hidden p-2">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 appearance-none bg-transparent cursor-pointer w-full"
          />
        </div>
      </div>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="p-1 bg-[#2c2b35] rounded-full border-2 border-[#646179] text-yellow-400 hover:bg-stone-800 transition cursor-pointer"
      >
        <FaPlus size={12} />
      </button>
    </div>
  );
}
