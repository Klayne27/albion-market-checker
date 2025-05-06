import { useState } from "react";
import ShopBuy from "./ShopBuy";
import ShopSell from "./ShopSell";
import ItemDetailPanel from "./ItemDetailPanel";
import ShopHeader from "./shop-header/ShopHeader";
import Tabs from "./shop-header/Tabs";

function Shop() {
  const [activeTab, setActiveTab] = useState("buy");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowPanel = (item, quality) => {
    setSelectedItem({ ...item, quality: quality });
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="border border-[#665249] bg-[#43342D] shadow-[inset_0_0_25px_10px_#665249] w-[56rem] h-[748px] z-0 relative">
        <ShopHeader />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-grow overflow-hidden">
          {activeTab === "buy" && <ShopBuy onShowPanel={handleShowPanel} />}
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
