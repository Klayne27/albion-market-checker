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
  const [selectType, setSelectType] = useState("any");
  const [searchTerm, setSearchTerm] = useState("");

  const tabStyles = (tabName) => {
    const baseStyles =
      "cursor-pointer px-4 py-5 font-bold rounded-tr-full rounded-br-full border-r-5 border-t-5 border-b-5 border-[#716F7B]";
    const activeStyles = "bg-[#535166] text-[#43342D] z-10 shadow-md";
    const inactiveStyles = "bg-[#2c2b35] hover:bg-[#535166] hover:shadow-sm z-0";

    return `${baseStyles} ${activeTab === tabName ? activeStyles : inactiveStyles}`;
  };

  const [selectedCity, setSelectedCity] = useState("Thetford");

  const handleShowPanel = (item) => {
    setSelectedItem(item);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedItem(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
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

  const handleSelectType = (e) => {
    setSelectType(e.target.value);
  };

  const handleResetFilters = () => {
    setSelectQuality("any");
    setSelectTier("any");
    setSelectEnchantment("any");
    setSelectType("any");
  };

  return (
    <>
      <div className="border bg-[#43342D] w-[70rem] h-[57rem] z-0 relative">
        <div className="border-b-2 border-[#29201B] pb-4 pt-4 bg-[#43342D] px-5">
          <div className="flex items-center gap-2">
            <div className="border-3 border-[#8C7C6B] rounded-full w-24 h-24 my-2"></div>
            <img src="./albion.png" className="absolute size-45 -left-5.5" />
            <span className="text-[#8C7C6B] font-extrabold text-3xl">
              {selectedCity}'s Marketplace
            </span>
            <span className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] mt-2 relative">
              <FaArrowRotateRight size={16} className="absolute right-0.5 top-0.5" />
            </span>
            <div className="flex flex-col h-18 absolute ml-[805px] justify-center items-end mt-4">
              <div className="text-[#8C7C6B] font-semibold text-3xl mr-7">
                🪩{formatNumber(inventory.silver)}
              </div>
            </div>
            <div>
              <div className="flex mt-2 absolute flex-col left-[69rem] top-46 gap-3 ">
                <button
                  className={`${tabStyles("buy")} text-green-400`}
                  onClick={() => setActiveTab("buy")}
                >
                  Buy
                </button>
                <button
                  className={`${tabStyles("sell")} text-red-500`}
                  onClick={() => setActiveTab("sell")}
                >
                  Sell
                </button>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex border rounded-full p-[5px] gap-0.5 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] mr-4 z-50">
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
              <select
                className="border border-[#646179] rounded-full w-45 px-2 py-0.5 text-md bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] text-[#926e47]"
                value={selectType}
                onChange={handleSelectType}
              >
                <option value="any">Any</option>
                <option value="2H">2H Weapon</option>
                <option value="OFF">Off-Hand</option>
                <option value="MAIN">Main Hand</option>
                <option value="HEAD">Head</option>
                <option value="ARMOR">Armor</option>
                <option value="SHOES">Shoes</option>
                <option value="CAPEITEM">Cape</option>
              </select>
              <select
                className="border border-[#646179] rounded-full w-45 px-2 text-md bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] text-[#926e47]"
                value={selectTier}
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
                value={selectEnchantment}
                onChange={handleSelectEnchantment}
              >
                <option value="any">Enchantment</option>
                <option value={1}>Uncommon</option>
                <option value={2}>Rare</option>
                <option value={3}>Exceptional</option>
                <option value={4}>Pristine</option>
              </select>
              <div className="flex gap-1">
                <select
                  className="border border-[#646179] rounded-full w-45  px-2 text-md bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] text-[#926e47]"
                  value={selectQuality}
                  onChange={handleSelectQuality}
                >
                  <option value="any">Quality</option>
                  <option value={1}>Normal</option>
                  <option value={2}>Good</option>
                  <option value={3}>Outstanding</option>
                  <option value={4}>Excellent</option>
                  <option value={5}>Masterpiece</option>
                </select>
                <span
                  className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] relative"
                  onClick={handleResetFilters}
                >
                  <FaArrowRotateLeft size={16} className="absolute right-0.5 top-0.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-hidden">
          {activeTab === "buy" && (
            <ShopBuy
              onShowPanel={handleShowPanel}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectQuality={selectQuality}
              selectTier={selectTier}
              selectEnchantment={selectEnchantment}
              selectType={selectType}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
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
