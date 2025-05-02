import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectInventory } from "../inventorySlice";

const baseURLimage = "https://render.albiononline.com/v1/item/";

function ShopSell({ onShowPanel, searchTerm }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { inventory } = useSelector(selectInventory);
  const itemsPerPage = 30;

  // 1) Filter across the entire inventory
  const filtered = useMemo(() => {
    if (!searchTerm) return inventory;
    const lower = searchTerm.toLowerCase();
    return inventory.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) || item.id.toLowerCase().includes(lower)
    );
  }, [inventory, searchTerm]);

  // 2) Recompute total pages based on filtered length
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // 3) Reset back to page 1 whenever the filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // 4) Slice out just the items for the current page
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  // 5) Safe page increment/decrement
  const goToNextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  return (
    <div className="p-2">
      <div className="border px-3 py-3 bg-[#e4bb93] shadow-[inset_0_0_25px_15px_#eca966]">
        <h1 className="font-bold mb-1 text-4xl">Your Inventory</h1>

        {/* Header */}
        <div className="grid grid-cols-[2fr_2fr] border rounded-xl p-1 gap-3 mr-6 bg-[#716F7B]">
          <div className="border px-2 py-0.5 rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
            Item
          </div>
          <div className="border px-2 py-0.5 rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
            Durability
          </div>
        </div>

        {/* Items */}
        <div className="border-t border-b border-[#917663] p-1 mt-2 overflow-auto h-[550px] custom-scrollbar">
          {currentItems.map((item, i) => (
            <div
              key={item.id}
              className={`px-2 py-2 grid grid-cols-[2fr_2fr] justify-between ${
                i % 2 === 0 ? "bg-[#dab593]" : ""
              }`}
            >
              <div className="flex justify-start items-center">
                <div
                  className={`w-22 h-22 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
                  style={{
                    backgroundImage: `url('${baseURLimage}${item.id}')`,
                    backgroundSize: "114%",
                  }}
                ></div>
                <p className="ml-2 text-[#4e2c08] text-lg">{item.name}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4e2c08] text-lg">100/100</span>
                <button
                  type="button"
                  className=" w-[118px] py-1 border-2 rounded-full text-lg border-gray-500 cursor-pointer shadow-[inset_0_0_10px_1px_#660101] bg-[#c70101] text-yellow-400 hover:opacity-80 active:scale-95"
                  onClick={() => onShowPanel(item)}
                >
                  Sell
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-gray-600">No items match your search.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-3 items-center">
          <span className="border h-0 w-full border-[#917663]"></span>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="border-2 rounded-full px-3 size-7 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30"
          >
            <RxCaretLeft size={32} className="-left-1 -bottom-1 absolute" />
          </button>
          <span className="text-lg text-[#43342D] font-bold">{currentPage}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="border-2 rounded-full px-3 size-7 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30"
          >
            <RxCaretRight size={32} className="-left-1 -bottom-1 absolute" />
          </button>
          <span className="border h-0 w-full border-[#917663]"></span>
        </div>
      </div>
    </div>
  );
}

export default ShopSell;
