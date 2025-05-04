import Filters from "./Filters/Filters";
import MarketName from "./MarketName";

function ShopHeader({ activeTab, setActiveTab }) {
  return (
    <div className="border-b-5 border-[#29201B] pb-2 pt-2 bg-[#43342D] shadow-[inset_0_0_25px_10px_#665249] px-5">
      <MarketName activeTab={activeTab} setActiveTab={setActiveTab} />
      <Filters />
    </div>
  );
}

export default ShopHeader;
