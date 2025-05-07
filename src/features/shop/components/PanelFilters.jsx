import { FaArrowRotateRight } from "react-icons/fa6";

function PanelFilters() {

  return (
    <div className="flex border rounded-full p-[3px] gap-4 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] absolute top-[110px] right-4">
      <select
        className="flex justify-between border w-[141px] border-[#646179] rounded-full px-2 text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] hover:opacity-80"
        disabled
      >
        <option>Any</option>
      </select>

      <select
        className="flex justify-between border w-[141px] border-[#646179] rounded-full px-2 text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] hover:opacity-80"
        disabled
      >
        <option>Any</option>
      </select>

      <select
        className="flex justify-between border w-[141px] border-[#646179] rounded-full px-2 text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] hover:opacity-80"
        disabled
      >
        <option>Tier</option>
      </select>

      <span className="border-2 rounded-full px-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35]  relative">
        <FaArrowRotateRight size={14} className="absolute right-0.5 top-0.5" />
      </span>
    </div>
  );
}

export default PanelFilters;
