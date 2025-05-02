import React, { useCallback, useMemo, useRef, useState, useEffect } from "react"; // Added useEffect
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { formatNumber } from "../utils/helpers";
import { useItemData } from "../hooks/useItemData";
import { useItemPrices } from "../hooks/useItemPrices";

const baseURLimage = "https://render.albiononline.com/v1/item/";

function ShopBuy({ onShowPanel, searchTerm }) {
  const { itemArray, loading: isItemDataLoading, error: itemDataError } = useItemData();
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCity, setSelectedCity] = useState("Lymhurst");
  const citiesOptions = [
    { name: "Thetford", value: "Thetford" },
    { name: "Caerleon", value: "Caerleon" },
    { name: "Black Market", value: "Black Market" },
  ];

  const itemsPerPage = 30;

  const filteredItems = useMemo(() => {
    if (!searchTerm) return itemArray;
    const lower = searchTerm.toLowerCase();
    return itemArray.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) || item.id.toLowerCase().includes(lower)
    );
  }, [itemArray, searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  const itemIdsToFetch = useMemo(() => pageItems.map((item) => item.id), [pageItems]);
  const { priceData, isPriceLoading, isPriceFetching } =
    useItemPrices(itemIdsToFetch, selectedCity, isItemDataLoading, itemDataError);

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
  }, [
    itemArray,
    priceData,
    itemIdsToFetch,
    selectedCity,
    isItemDataLoading,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const displayItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return combinedItemData;
    }

    return combinedItemData.filter(
      (item) => item.name.toLowerCase().includes(term)
    );
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
      <div className="border px-3 py-2 bg-[#EDC298]">
        <h1 className="font-bold mb-1 text-2xl">Market Offers</h1>

        {/* Consider adding the city selector here if needed */}
        {/* <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            {citiesOptions.map(city => <option key={city.value} value={city.value}>{city.name}</option>)}
        </select> */}

        <div className="grid grid-cols-[2fr_1fr_2fr] border rounded-lg p-1 gap-3 mr-6 bg-[#716F7B]">
          <div className="border px-2 rounded-md text-xs bg-[#FBD7A6]">Item</div>
          <div className="border px-2 rounded-md text-xs bg-[#FBD7A6]">Duration</div>
          <div className="border px-2 rounded-md text-xs bg-[#FBD7A6]">Price</div>
        </div>

        <div className="border-t border-b border-[#917663] p-1 mt-2 overflow-auto h-96 custom-scrollbar relative">
          {!isPriceLoading &&
            displayItems.length > 0 &&
            displayItems.map((item, i) => (
              <div
                key={`${item.id}-${currentPage}`} // Add currentPage to key if items might reappear on different pages
                className={`px-2 py-2 grid grid-cols-[2fr_1fr_2fr] items-center ${
                  i % 2 === 0 ? "bg-[#D4B394]" : "bg-[#EDC298]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={`${baseURLimage}${item.id}?quality=1`} // Add quality param if needed
                    style={{ width: 64, height: 64, objectFit: "contain" }}
                    alt={item.name}
                    loading="lazy"
                  />
                  <p className="text-[#4e2c08] text-sm truncate" title={item.name}>
                    {item.name}
                  </p>
                </div>
                <p className="ml-4 text-[#4e2c08] text-sm">29 d 23 h</p>
                <div className="flex justify-between items-center ml-4">
                  <span className="text-[#4e2c08] text-sm">
                    {`🪩 ${formatNumber(item.sell_price_min)}`}
                  </span>
                  <button
                    type="button"
                    className="px-6 py-1 border-2 rounded-full text-xs border-gray-500 cursor-pointer bg-gradient-to-b from-[#660101] via-[#7c0101] to-[#c70101] text-yellow-400 hover:from-[#7a0101] hover:via-[#700101] hover:to-[#a80101] active:from-[#520101] active:via-[#690101] active:to-[#970202] disabled:opacity-50"
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
            className="border-2 rounded-full px-2 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30"
            disabled={currentPage === 1 || isPriceLoading || isPriceFetching}
            aria-label="Previous Page"
          >
            <RxCaretLeft size={25} className="-left-1 -bottom-1 absolute" />
          </button>
          <p className="text-xs text-[#43342D]">
            {currentPage}
          </p>
          <button
            onClick={goToNextPage}
            className="border-2 rounded-full px-2 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30"
            disabled={currentPage === totalPages || isPriceLoading || isPriceFetching}
            aria-label="Next Page"
          >
            <RxCaretRight size={25} className="-left-1 -bottom-1 absolute" />
          </button>
          <span className="border h-0 w-full border-[#917663]"></span>
        </div>
      </div>
    </div>
  );
}

export default ShopBuy;
