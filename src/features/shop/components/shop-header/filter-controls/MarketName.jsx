import { useDispatch, useSelector } from "react-redux";
import { handleRefreshMarket } from "../../../slices/filterSlice";
import { formatNumber } from "../../../../../utils/helpers";
import { FaArrowRotateRight } from "react-icons/fa6";

function MarketName() {
  const dispatch = useDispatch();
  const silver = useSelector(state => state.inventory.silver);
  const selectCity = useSelector(state => state.filter.selectCity)

  return (
    <div className="flex items-center gap-2">
      <div className="border-3 border-[#8C7C6B] rounded-full w-[76.8px] h-[76.8px] my-2"></div>
      <img src="./albion.png" className="absolute size-[144px] -left-3.5" />
      <span className="text-[#8C7C6B] font-extrabold text-3xl">
        {selectCity}'s Marketplace
      </span>
      <span
        className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] mt-2 relative hover:opacity-80 cursor-pointer"
        onClick={() => dispatch(handleRefreshMarket())}
      >
        <FaArrowRotateRight size={16} className="absolute right-0.5 top-0.5" />
      </span>
      <div className="flex flex-col h-18 absolute ml-[644px] justify-center items-end mt-4">
        <div className="text-[#8C7C6B] font-semibold text-2xl mr-7">
          🪩{formatNumber(silver)}
        </div>
      </div>
    </div>
  );
}

export default MarketName;
