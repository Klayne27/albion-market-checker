import { FaMinus, FaPlus } from "react-icons/fa6";

export default function IconSlider({ min = 0, max = 100, value, onChange }) {
  const handleInputChange = (e) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      onChange(min);
      return;
    }

    const numericValue = parseInt(rawValue, 10);
    if (isNaN(numericValue)) {
      return;
    }
    const clampedValue = Math.max(min, Math.min(max, numericValue));

    onChange(clampedValue);
  };

  const isAtMin = value <= min;
  const isAtMax = value >= max;

  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className=" bg-[#2c2b35] rounded-full border-2 border-[#646179] text-yellow-400 hover:bg-stone-800 transition cursor-pointer"
        disabled={isAtMin}
      >
        <FaMinus size={12} />
      </button>

      <div className="relative flex-1 h-4.5">
        <input
          type="number"
          min={min}
          max={max}
          value={value === 0 ? "" : value}
          onChange={handleInputChange} 
          className="absolute -top-5 transform -translate-x-1/2 text-yellow-400 text-xs font-semibold bg-[#4d4d4d] shadow-[inset_0_0_6px_4px_#252320]  rounded-full border-3 border-gray-400 w-11 text-center"
          aria-label="Quantity"
          style={{ left: `${percent}%` }}
        />
        <div className="h-2 bg-[#4d4d4d] shadow-[inset_0_0_4px_4px_#252320] rounded-full overflow-hidden p-2">
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
        className=" bg-[#2c2b35] rounded-full border-2 border-[#646179] text-yellow-400 hover:bg-stone-800 transition cursor-pointer"
        disabled={isAtMax}
      >
        <FaPlus size={12} />
      </button>
    </div>
  );
}
