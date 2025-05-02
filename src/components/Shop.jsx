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
  const [selectQuality, setSelectQuality] = useState(1);
  const [selectTier, setSelectTier] = useState("any");
  const [selectEnchantment, setSelectEnchantment] = useState("any");
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

  const handleSelectQuality = (e) => {
    setSelectQuality(e.target.value);
  };

  const handleSelectTier = (e) => {
    setSelectTier(e.target.value);
  };

  const handleSelectEnchantment = (e) => {
    setSelectEnchantment(e.target.value);
  };

  return (
    <>
      <div className="border bg-[#43342D] w-[70rem] h-[57rem] z-0 relative">
        <div className="border-b-2 border-[#29201B] pb-4 pt-4 bg-[#43342D] px-5">
          <div className="flex items-center gap-2">
            <div className="border-3 border-[#8C7C6B] rounded-full w-24 h-24 relative my-2"></div>
            <img src="./albion.png" className="absolute size-45 -left-5.5" />
            <span className="text-[#8C7C6B] font-extrabold text-3xl">
              Lymhurst's Marketplace
            </span>
            <span className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] mt-2 relative">
              <FaArrowRotateRight size={16} className="absolute right-0.5 top-0.5" />
            </span>
            <div className="flex flex-col h-18 absolute ml-[805px] justify-center items-end mt-4">
              <div className="text-[#8C7C6B] font-semibold text-3xl mr-7">
                🪩{formatNumber(inventory.silver)}
              </div>
            </div>
            <div className="relative">
              <button className="border-2 rounded-full px-2 size-7 text-yellow-400 border-[#646179] bg-[#2c2b35] relative left-[515px] bottom-9 cursor-pointer">
                <ImCross size={14} className="absolute top-1.5 left-1.5" />
              </button>
              <div className="flex mt-2 absolute flex-col left-[34rem] top-32 gap-3 ">
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
          <div className="flex">
            <div className="flex border rounded-full p-[5px] gap-0.5 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] mr-6">
              <input
                className="border rounded-full w-45 px-2 text-md bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] placeholder:text-[#926e47] "
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <span
                className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer" // Added cursor-pointer
                onClick={handleResetSearch}
              >
                <FaArrowRotateLeft size={16} className="absolute right-0.5 top-0.5" />
              </span>
            </div>
            <div className="flex border rounded-full p-[5px] gap-5 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] mr-3">
              {/* ... your select dropdowns ... */}

              <select className="border border-[#646179] rounded-full w-45 px-2 py-0.5 text-md bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] text-[#926e47]">
                <option>Melee</option>
              </select>
              <select
                className="border border-[#646179] rounded-full w-45 px-2 text-md bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] text-[#926e47]"
                onChange={handleSelectTier}
              >
                <option value="any">Tier</option>
                <option value={1}>Tier 1</option>
                <option value={2}>Tier 2</option>
                <option value={3}>Tier 3</option>
                <option value={4}>Tier 4</option>
                <option value={5}>Tier 5</option>
                <option value={6}>Tier 6</option>
                <option value={7}>Tier 7</option>
                <option value={8}>Tier 8</option>
              </select>
              <select
                className="border border-[#646179] rounded-full w-45 px-2 text-md bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] text-[#926e47]"
                onChange={handleSelectEnchantment}
              >
                <option value="any">Enchantment</option>
                <option value={1}>Uncommon</option>
                <option value={2}>Rare</option>
                <option value={3}>Exceotional</option>
                <option value={4}>Pristine</option>
              </select>
              <div className="flex gap-1">
                <select
                  className="border border-[#646179] rounded-full w-45  px-2 text-md bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] text-[#926e47]"
                  onChange={handleSelectQuality}
                >
                  <option value="any">Quality</option>
                  <option value={1}>Normal</option>
                  <option value={2}>Good</option>
                  <option value={3}>Outstanding</option>
                  <option value={4}>Excellent</option>
                  <option value={5}>Masterpiece</option>
                </select>
                <span className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] relative">
                  <FaArrowRotateLeft size={16} className="absolute right-0.5 top-0.5" />
                </span>
              </div>
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
              selectQuality={selectQuality}
              selectTier={selectTier}
              selectEnchantment={selectEnchantment}
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
