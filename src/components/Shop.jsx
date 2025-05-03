import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { useState } from "react";
import ShopBuy from "./ShopBuy";
import ShopSell from "./ShopSell";
import ItemDetailPanel from "./ItemDetailPanel";
import { formatNumber } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { selectInventory } from "../inventorySlice";
import CustomDropdown from "./CustomDropdown";
import {
  handleRefreshMarket,
  handleResetFilters,
  handleResetSearch,
  setSearchTerm,
  setSelectEnchantment,
  setSelectQuality,
  setSelectTier,
  setSelectType,
} from "../filterSlice";

function Shop() {
  const inventory = useSelector(selectInventory);

  const [activeTab, setActiveTab] = useState("buy");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    selectTier,
    selectEnchantment,
    selectType,
    selectQuality,
    searchTerm,
    selectCity,
  } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const [openDropdown, setOpenDropdown] = useState(null);

  const tabStyles = (tabName) => {
    const baseStyles =
      "cursor-pointer px-4 py-5 font-bold rounded-tr-full rounded-br-full border-r-5 border-t-5 border-b-5 border-[#716F7B]";
    const activeStyles = "bg-[#535166] text-[#43342D] z-10 shadow-md";
    const inactiveStyles = "bg-[#2c2b35] hover:bg-[#535166] hover:shadow-sm z-0";

    return `${baseStyles} ${activeTab === tabName ? activeStyles : inactiveStyles}`;
  };

  const typeOptions = [
    { name: "Any", value: "any" },
    { name: "2H Weapon", value: "2H" },
    { name: "Off-Hand", value: "OFF" },
    { name: "Main Hand", value: "MAIN" },
    { name: "Head", value: "HEAD" },
    { name: "Armor", value: "ARMOR" },
    { name: "Shoes", value: "SHOES" },
    { name: "Cape", value: "CAPEITEM" },
  ];

  const tierOptions = [
    { name: "Tier", value: "any" },
    { name: "Tier 1", value: "1" },
    { name: "Tier 2", value: "2" },
    { name: "Tier 3", value: "3" },
    { name: "Tier 4", value: "4" },
    { name: "Tier 5", value: "5" },
    { name: "Tier 6", value: "6" },
    { name: "Tier 7", value: "7" },
    { name: "Tier 8", value: "8" },
  ];

  const enchantmentOptions = [
    { name: "All", value: "any" },
    { name: "Enchantment 1", value: "1" },
    { name: "Enchantment 2", value: "2" },
    { name: "Enchantment 3", value: "3" },
    { name: "Enchantment 4", value: "4" },
  ];

  const qualityOptions = [
    { name: "Normal", value: 1 },
    { name: "Good", value: 2 },
    { name: "Outstanding", value: 3 },
    { name: "Excellent", value: 4 },
    { name: "Masterpiece", value: 5 },
  ];

  const handleShowPanel = (item, quality) => {
    setSelectedItem({ ...item, quality: quality });
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedItem(null);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSelectQuality = (value) => {
    dispatch(setSelectQuality(value));
  };

  const handleSelectTier = (value) => {
    dispatch(setSelectTier(value));
  };

  const handleSelectEnchantment = (value) => {
    dispatch(setSelectEnchantment(value));
  };

  const handleSelectType = (value) => {
    dispatch(setSelectType(value));
  };

  const handleToggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <>
      <div className="border border-[#665249] bg-[#43342D] shadow-[inset_0_0_25px_10px_#665249] w-[70rem] h-[57rem] z-0 relative">
        <div className="border-b-5 border-[#29201B] pb-4 pt-4 bg-[#43342D] shadow-[inset_0_0_25px_10px_#665249] px-5">
          <div className="flex items-center gap-2">
            <div className="border-3 border-[#8C7C6B] rounded-full w-24 h-24 my-2"></div>
            <img src="./albion.png" className="absolute size-45 -left-5.5" />
            <span className="text-[#8C7C6B] font-extrabold text-3xl">
              {selectCity}'s Marketplace
            </span>
            <span
              className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] mt-2 relative hover:opacity-80 cursor-pointer"
              onClick={() => dispatch(handleRefreshMarket())}
            >
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
                className="border rounded-full w-45 px-2 text-md bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] placeholder:text-[#926e47] hover:opacity-80"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <span
                className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] relative  hover:opacity-80 cursor-pointer"
                onClick={() => dispatch(handleResetSearch())}
              >
                <FaArrowRotateLeft size={16} className="absolute right-0.5 top-0.5" />
              </span>
            </div>
            <div className="flex border rounded-full p-[5px] gap-5 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] mr-3">
              <CustomDropdown
                id="type"
                options={typeOptions}
                selectedValue={selectType}
                onValueChange={handleSelectType}
                placeholder="Any"
                openDropdown={openDropdown}
                onOpenDropdown={handleToggleDropdown}
              />
              <CustomDropdown
                id="tier"
                options={tierOptions}
                selectedValue={selectTier}
                onValueChange={handleSelectTier}
                placeholder="Tier"
                openDropdown={openDropdown}
                onOpenDropdown={handleToggleDropdown}
              />
              <CustomDropdown
                id="enchantment"
                options={enchantmentOptions}
                selectedValue={selectEnchantment}
                onValueChange={handleSelectEnchantment}
                placeholder="Enchantment"
                openDropdown={openDropdown}
                onOpenDropdown={handleToggleDropdown}
              />
              <div className="flex gap-1">
                <CustomDropdown
                  id="quality"
                  options={qualityOptions}
                  selectedValue={selectQuality}
                  onValueChange={handleSelectQuality}
                  placeholder="Normal"
                  openDropdown={openDropdown}
                  onOpenDropdown={handleToggleDropdown}
                />
                <span
                  className="border-2 rounded-full px-1 size-6 text-yellow-400 border-[#646179] bg-[#2c2b35] relative  hover:opacity-80 cursor-pointer"
                  onClick={() => dispatch(handleResetFilters())}
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
              openDropdown={openDropdown}
              onOpenDropdown={handleToggleDropdown}
            />
          )}
          {activeTab === "sell" && <ShopSell onShowPanel={handleShowPanel} />}
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
