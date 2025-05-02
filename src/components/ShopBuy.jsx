import React, { useCallback, useMemo, useRef, useState, useEffect } from "react"; // Added useEffect
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { formatNumber } from "../utils/helpers";
import { useItemData } from "../hooks/useItemData";
import { useItemPrices } from "../hooks/useItemPrices";

const baseURLimage = "https://render.albiononline.com/v1/item/";

function ShopBuy({
  onShowPanel,
  searchTerm,
  selectQuality,
  selectTier,
  selectEnchantment,
}) {
  const { itemArray, loading: isItemDataLoading, error: itemDataError } = useItemData();
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCity, setSelectedCity] = useState("Lymhurst");
  const citiesOptions = [
    { name: "Thetford", value: "Thetford" },
    { name: "Bridgewatch", value: "Bridgewatch" },
    { name: "Lymhurst", value: "Lymhurst" },
    { name: "Fort Sterling", value: "Fort Sterling" },
    { name: "Caerleon", value: "Caerleon" },
    { name: "Black Market", value: "Black Market" },
  ];
  const customItemId = `T${selectTier}_`;
  const itemsPerPage = 30;

  const filteredItems = useMemo(() => {
    let currentItems = itemArray; // Ensure itemArray is loaded before filtering

    if (!Array.isArray(currentItems)) {
      return [];
    } // --- Apply Search Term Filter ---

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      currentItems = currentItems.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) || item.id.toLowerCase().includes(lower)
      );
    } // --- Apply Tier Filter ---

    if (selectTier !== "any") {
      currentItems = currentItems.filter((item) => {
        // Item ID must start with T followed by the selected tier number and an underscore
        return item.id.startsWith(`T${selectTier}_`);
      });
    } // --- Apply Enchantment Filter ---

    if (selectEnchantment !== "any") {
      currentItems = currentItems.filter((item) => {
        const enchantmentMatch = item.id.match(/@(\d+)$/); // Finds '@' followed by digits at the end
        const itemEnchantment = enchantmentMatch ? enchantmentMatch[1] : "0"; // '0' if no '@' found

        return itemEnchantment === selectEnchantment;
      });
    }

    return currentItems;
  }, [itemArray, searchTerm, selectTier, selectEnchantment]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  const itemIdsToFetch = useMemo(() => pageItems.map((item) => item.id), [pageItems]);
  const { priceData, isPriceLoading, isPriceFetching } = useItemPrices(
    itemIdsToFetch,
    selectedCity,
    isItemDataLoading,
    itemDataError
  );

  const combinedItemData = useMemo(() => {
    if (isItemDataLoading || !Array.isArray(itemArray) || !Array.isArray(priceData)) {
      return [];
    }

    const priceMap = new Map(priceData.map((item) => [item.item_id, item]));

    return itemArray
      .filter((item) => itemIdsToFetch.includes(item.id))
      .map((item) => {
        const priceInfo = priceMap.get(item.id);
        return {
          id: item.id,
          name: item.name,
          sell_price_min: priceInfo?.sell_price_min ?? 0,
          buy_price_max: priceInfo?.buy_price_max ?? 0,
          last_updated: priceInfo?.last_updated ?? null,
          location: priceInfo?.location ?? selectedCity,
        };
      });
  }, [itemArray, priceData, itemIdsToFetch, selectedCity, isItemDataLoading]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    // No state change needed here, just dependency for re-render
  }, [selectQuality]);

  const displayItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return combinedItemData;
    }

    return combinedItemData.filter((item) => item.name.toLowerCase().includes(term));
  }, [combinedItemData, searchTerm]);

  function useThrottle(fn, delay = 200) {
    const last = useRef(0);
    return useCallback(
      (...args) => {
        const now = Date.now();
        if (now - last.current > delay) {
          last.current = now;
          fn(...args);
        }
      },
      [fn, delay]
    );
  }

  const goToNextPage = useThrottle(() => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }, 200);

  const goToPrevPage = useThrottle(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, 200);

  if (isItemDataLoading) {
    return <p className="text-center text-blue-600 text-lg p-4">Loading item list...</p>;
  }
  if (itemDataError) {
    return (
      <p className="text-center text-red-600 text-lg p-4">
        Error loading item list: {itemDataError.message}
      </p>
    );
  }

  return (
    <div className="p-2">
      <div className="border px-3 py-3 bg-[#e4bb93] shadow-[inset_0_0_25px_15px_#eca966]">
        <div className="flex flex-">
          <h1 className="font-bold mb-1 text-4xl">Market Offers</h1>
          <div className="flex border rounded-full p-[5px] bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] mr-3 mb-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="border border-[#646179] rounded-full w-40 px-2 text-sm  bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] text-[#000000]"
            >
              {citiesOptions.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr_2fr] border rounded-xl p-1 gap-3 mr-6 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] items-center">
          <div className="border px-2 py-0.5 rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
            Item
          </div>
          <div className="border px-2 py-0.5 rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
            Duration
          </div>
          <div className="border px-2 py-0.5 rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
            Price
          </div>
        </div>

        <div className="border-t border-b border-[#917663] p-1 mt-2 overflow-auto h-[550px] custom-scrollbar relative">
          {!isPriceLoading &&
            displayItems.length > 0 &&
            displayItems.map((item, i) => (
              <div
                key={`${item.id}-${currentPage}`} // Add currentPage to key if items might reappear on different pages
                className={`px-2 py-2 grid grid-cols-[2fr_1fr_2fr] items-center ${
                  i % 2 === 0 ? "bg-[#dab593]" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-22 h-22 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
                    style={{
                      backgroundImage: `url('${baseURLimage}${item.id}?quality=${selectQuality}')`,
                      backgroundSize: "114%",
                    }}
                  ></div>
                  <p
                    className="text-[#4e2c08] text-lg font-extrabold truncate"
                    title={item.name}
                  >
                    {item.name}
                  </p>
                </div>
                <p className="ml-4 text-[#4e2c08] text-lg">29 d 23 h</p>
                <div className="flex justify-between items-center ml-4">
                  <span className="text-[#4e2c08] text-lg">
                    {`🪩 ${formatNumber(item.sell_price_min)}`}
                  </span>
                  <button
                    type="button"
                    className=" w-[118px] py-1 border-2 rounded-full text-lg border-gray-500 cursor-pointer shadow-[inset_0_0_10px_1px_#660101] bg-[#c70101] text-yellow-400 hover:opacity-80 active:scale-95"
                    onClick={() => onShowPanel(item)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          {!isPriceLoading && displayItems.length === 0 && searchTerm && (
            <p className="text-center text-[#4e2c08] p-4">
              No items exactly match "{searchTerm}" on this page.
            </p>
          )}
          {!isPriceLoading &&
            displayItems.length === 0 &&
            !searchTerm &&
            !isPriceFetching && (
              <p className="text-center text-[#4e2c08] p-4">
                No items to display on this page.
              </p>
            )}
        </div>

        <div className="flex justify-center gap-4 mt-3 items-center">
          <span className="border h-0 w-full border-[#917663]"></span>
          <button
            onClick={goToPrevPage}
            className="border-2 rounded-full px-3 size-7 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30"
            disabled={currentPage === 1 || isPriceLoading || isPriceFetching}
            aria-label="Previous Page"
          >
            <RxCaretLeft size={32} className="-left-1 -bottom-1 absolute" />
          </button>
          <p className="text-lg text-[#43342D]">{currentPage}</p>
          <button
            onClick={goToNextPage}
            className="border-2 rounded-full px-3 size-7 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30"
            disabled={currentPage === totalPages || isPriceLoading || isPriceFetching}
            aria-label="Next Page"
          >
            <RxCaretRight size={32} className="-left-1 -bottom-1 absolute" />
          </button>
          <span className="border h-0 w-full border-[#917663]"></span>
        </div>
      </div>
    </div>
  );
}

export default ShopBuy;
