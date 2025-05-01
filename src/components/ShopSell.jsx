import { useShop } from "../hooks/useShop";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useInventory } from "../hooks/useInventory";
import { useSellItem } from "../hooks/useSellItem";
import { useState } from "react";

function ShopSell({ onShowPanel }) {
  const { shop, isLoading } = useShop();
  const { sellItem, isSelling } = useSellItem();
  const [currentPage, setCurrentPage] = useState(1);

  const { inventory, isLoadingInv } = useInventory();

  if (isLoadingInv) return <p>Loading Inv...</p>;
  if (isLoading) return <p>Loading...</p>;

  const itemsPerPage = 30;
  const totalPages = Math.ceil(shop.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = shop.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  console.log(inventory);

  return (
    <div className="p-2">
      <div className="border px-3 py-2 bg-[#EDC298]">
        <h1 className="font-bold mb-1 text-2xl">Your Inventory</h1>
        <div className="grid grid-cols-[2fr_2fr] border rounded-lg p-1 gap-3 mr-6 bg-[#716F7B]">
          <div className="border px-2 rounded-md text-xs bg-[#FBD7A6]">Item</div>
          <div className="border px-2 rounded-md text-xs bg-[#FBD7A6] text-[#4e2c08]">
            Durability
          </div>
        </div>
        <div className="border-t border-b border-[#917663] p-1 mt-2 overflow-auto h-96 custom-scrollbar">
          {currentItems.map((item, i) => (
            <div
              key={item.name}
              className={`px-2 py-6 grid grid-cols-[2fr_2fr] justify-between ${
                i % 2 === 0 ? "bg-[#D4B394]" : ""
              }`}
            >
              <p className=" mr-2 border-[#917663] text-[#4e2c08]">{item.name}</p>
              <div className="flex justify-between ">
                <span>100/100</span>
                <button
                  type="button"
                  className="px-8 py-1 border-3 rounded-full text-sm border-gray-500 cursor-pointer bg-gradient-to-b from-[#660101] via-[#7c0101] to-[#c70101] text-yellow-400 hover:from-[#7a0101] hover:via-[#700101] hover:to-[#a80101] active:from-[#520101] active:via-[#690101] active:to-[#970202]"
                  onClick={() => onShowPanel(item)}
                  disabled={isSelling}
                >
                  Sell
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-3 items-center ">
          <span className="border h-0 w-full border-[#917663]"></span>
          <button
            onClick={goToPrevPage}
            className="border-2 rounded-full px-2 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30"
            disabled={currentPage === 1}
          >
            <RxCaretLeft size={25} className="-left-1 -bottom-1 absolute" />
          </button>
          <p className="text-sm text-[#43342D] font-bold">{currentPage}</p>
          <button
            onClick={goToNextPage}
            className="border-2 rounded-full px-2 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30"
            disabled={currentPage === totalPages}
          >
            <RxCaretRight size={25} className="-left-1 -bottom-1 absolute" />
          </button>
          <span className="border h-0 w-full border-[#917663]"></span>
        </div>
      </div>
    </div>
  );
}

export default ShopSell;
