import { useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInventory } from "../../../inventory/slices/inventorySlice";
import { selectShop, setCurrentPage } from "../../slices/shopSlice";
import { selectFilter } from "../../slices/filterSlice";

import ShopSellList from "./ShopSellItemList";
import ShopSellHeader from "./ShopSellHeader";
import ShopPagination from "../pagination/ShopPagination";

function ShopSell({ onShowPanel }) {
  const { inventory } = useSelector(selectInventory);
  const { searchTerm, selectTier, selectEnchantment, selectType, selectCity } =
    useSelector(selectFilter);
  const { currentPage } = useSelector(selectShop);

  const dispatch = useDispatch();

  const filteredItems = useMemo(() => {
    let currentItems = inventory;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      currentItems = currentItems.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) || item.id.toLowerCase().includes(lower)
      );
    }

    if (selectTier !== "All") {
      currentItems = currentItems.filter((item) => {
        return item.id.startsWith(`T${selectTier}_`);
      });
    }

    if (selectEnchantment !== "All") {
      currentItems = currentItems.filter((item) => {
        const enchantmentMatch = item.id.match(/@(\d+)$/);
        const itemEnchantment = enchantmentMatch ? enchantmentMatch[1] : "0";

        return itemEnchantment === selectEnchantment;
      });
    }

    if (selectType !== "All") {
      currentItems = currentItems.filter((item) => {
        if (typeof item.id !== "string" || item.id === "") {
          return false;
        }

        const id = item.id;
        const firstUnderscoreIndex = id.indexOf("_");

        const segmentAfterFirstUnderscore = id.substring(firstUnderscoreIndex + 1);

        const selectTypeLower = selectType.toLowerCase();
        const segmentLower = segmentAfterFirstUnderscore.toLowerCase();

        return segmentLower.startsWith(selectTypeLower);
      });
    }

    return currentItems;
  }, [inventory, searchTerm, selectTier, selectEnchantment, selectType]);

  const itemsPerPage = 48;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectCity, selectTier, selectEnchantment, selectType]);

  return (
    <div className="p-2">
      <div className="border px-3 py-3 bg-[#e4bb93] shadow-[inset_0_0_25px_15px_#eca966]">
        <ShopSellHeader />
        <div className="border-t border-b border-[#917663] p-1 mt-2 overflow-auto h-[440px] custom-scrollbar">
          {currentItems.map((item, i) => (
            <ShopSellList
              item={item}
              i={i}
              key={`${item.id}-${item.quality}-${i}`}
              onShowPanel={onShowPanel}
            />
          ))}

          {filteredItems.length === 0 && (
            <p className="text-center text-gray-600">No items match your search.</p>
          )}
        </div>

        <ShopPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={false}
        />
      </div>
    </div>
  );
}

export default ShopSell;
