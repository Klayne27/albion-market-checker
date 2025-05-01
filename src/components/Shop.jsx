import { ImCross } from "react-icons/im";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { useInventory } from "../hooks/useInventory";
import ShopBuy from "./ShopBuy";
import { useState } from "react";
import ShopSell from "./ShopSell";
import { formatNumber } from "../utils/helpers";
import ItemDetailPanel from "./ItemDetailPanel";

function Shop() {
  const { inventory, isLoadingInv } = useInventory();
  const [activeTab, setActiveTab] = useState("buy");
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State for panel visibility
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item


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

  // Handler to close the panel
  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedItem(null); // Clear selected item when closing
  };

  if (isLoadingInv) return <p>Loading Inv...</p>;

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
                <input
                  className="border rounded-full w-32 px-2 text-xs bg-[#FBD7A6] text-center placeholder:text-[#926e47] "
                  placeholder="Search..."
                />

                <span className="border-2 rounded-full px-1 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative ">
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
          <div className="flex border rounded-full p-[3px] gap-5 bg-[#716F7B] mr-6">
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
          {/* {isPanelOpen && selectedItem && (
            <ItemDetailPanel
              item={selectedItem}
              onClose={handleClosePanel}
              mode={activeTab} // Pass the current mode ('buy' or 'sell')
            />
          )} */}
        </div>
        <div className="flex-grow overflow-hidden">
          {/* Pass the handleShowPanel function down to both Buy and Sell tabs */}
          {activeTab === "buy" && <ShopBuy onShowPanel={handleShowPanel} />}
          {activeTab === "sell" && <ShopSell onShowPanel={handleShowPanel} />}
        </div>
      </div>
      {isPanelOpen && selectedItem && (
        <>
          {" "}
          {/* Use a fragment to group the overlay and the panel */}
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-40" // Styles for the dark overlay
            onClick={handleClosePanel} // Optional: Close panel when clicking outside
          ></div>
          {/* Item Detail Panel */}
          <ItemDetailPanel
            item={selectedItem}
            onClose={handleClosePanel}
            mode={activeTab} // Pass the current mode ('buy' or 'sell')
          />
        </>
      )}
    </>
  );
}

export default Shop;
