import { ImCross } from "react-icons/im";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { useState } from "react"; // Make sure useState is imported
import ShopBuy from "./ShopBuy";
import ShopSell from "./ShopSell";
import ItemDetailPanel from "./ItemDetailPanel";
import { formatNumber } from "../utils/helpers";
import { useSelector } from "react-redux";
import { selectInventory } from "../inventorySlice";

function Shop() {
  const inventory = useSelector(selectInventory);

  const [activeTab, setActiveTab] = useState("buy");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // --- Step 1: Add state for search term ---

  const tabStyles = (tabName) =>
    `cursor-pointer px-2 py-2 font-bold rounded-tr-full rounded-br-full border-r-2 border-t-2 border-b-2 ${
      activeTab === tabName
        ? "bg-[#EDC298] text-[#43342D] border-[#43342D] border-r-2 border-t-2 border-b-2"
        : "bg-[#EDC298] text-[#43342D] border-[#43342D] z-1"
    }`;

  const handleShowPanel = (item) => {
    setSelectedItem(item);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedItem(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // --- Step 2: Update search term state ---
  };

  const handleResetSearch = () => {
    setSearchTerm(""); // --- Step 5: Reset search term ---
  };

  return (
    <>
      <div className="border bg-[#43342D] w-[48rem] h-[41rem] z-0 relative">
        <div className="border-b-2 border-[#29201B] p-1 bg-[#43342D] px-5">
          <div className="flex items-center gap-2">
            <div className="border-3 border-[#8C7C6B] rounded-full w-17 h-17 relative my-2"></div>
            <img src="./albion.png" className="absolute size-32 -left-2" />
            <span className="text-[#8C7C6B] font-bold text-2xl">
              Thetford's Marketplace
            </span>
            <span className="border-2 rounded-full px-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] mt-2 relative">
              <FaArrowRotateRight size={12} className="absolute right-0.5 top-0.5" />
            </span>
            <div className="flex flex-col h-18 absolute ml-[34rem] justify-center items-end mt-4">
              <div className="text-[#8C7C6B] font-semibold text-lg mr-7">
                🪩{formatNumber(inventory.silver)}
              </div>
              <div className="flex border rounded-full p-[3px] gap-0.5 bg-[#716F7B] mr-6">
                {/* --- Step 2: Connect input to state and handler --- */}
                <input
                  className="border rounded-full w-32 px-2 text-xs bg-[#FBD7A6] text-center placeholder:text-[#926e47] "
                  placeholder="Search..."
                  value={searchTerm} // Bind value to state
                  onChange={handleSearchChange} // Call handler on change
                />

                {/* --- Step 5: Add onClick to reset button --- */}
                <span
                  className="border-2 rounded-full px-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer" // Added cursor-pointer
                  onClick={handleResetSearch} // Call reset handler
                >
                  <FaArrowRotateLeft size={12} className="absolute right-0.5 top-0.5" />
                </span>
              </div>
            </div>
            <div className="relative">
              <button className="border-2 rounded-full px-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] mt-2 relative left-[290px] bottom-7 cursor-pointer">
                <ImCross size={10} className="absolute top-1" />
              </button>
              <div className="flex mt-2 absolute flex-col left-[19rem] top-23 gap-3 ">
                <button className={tabStyles("buy")} onClick={() => setActiveTab("buy")}>
                  Buy
                </button>
                <button
                  className={tabStyles("sell")}
                  onClick={() => setActiveTab("sell")}
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
          {/* ... (Filter dropdowns section) ... */}
          <div className="flex border rounded-full p-[3px] gap-5 bg-[#716F7B] mr-6">
            {/* ... your select dropdowns ... */}
            <select className="border border-[#646179] rounded-full w-32 px-2 text-xs bg-[#FBD7A6] text-[#926e47]">
              <option>Melee</option>
            </select>
            <select className="border border-[#646179] rounded-full w-32 px-2 text-xs bg-[#FBD7A6] text-[#926e47]">
              <option>Sword</option>
            </select>
            <select className="border border-[#646179] rounded-full w-32 px-2 text-xs bg-[#FBD7A6] text-[#926e47]">
              <option>Tier 8</option>
            </select>
            <select className="border border-[#646179] rounded-full w-32 px-2 text-xs bg-[#FBD7A6] text-[#926e47]">
              <option>Enchantment</option>
            </select>
            <div className="flex gap-1">
              <select className="border border-[#646179] rounded-full w-32 px-2 text-xs bg-[#FBD7A6] text-[#926e47]">
                <option>Quality</option>
              </select>
              <span className="border-2 rounded-full px-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative">
                <FaArrowRotateLeft size={12} className="absolute right-0.5 top-0.5" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-hidden">
          {/* --- Step 3: Pass searchTerm down to active tab component --- */}
          {activeTab === "buy" && (
            <ShopBuy
              onShowPanel={handleShowPanel}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
          {activeTab === "sell" && (
            <ShopSell
              onShowPanel={handleShowPanel}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
        </div>
      </div>
      {/* ... (ItemDetailPanel logic - unchanged) ... */}
      {isPanelOpen && selectedItem && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={handleClosePanel}
          ></div>
          <ItemDetailPanel
            item={selectedItem}
            onClose={handleClosePanel}
            mode={activeTab}
          />
        </>
      )}
    </>
  );
}

export default Shop;
