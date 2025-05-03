import React, { useCallback, useMemo, useRef, useState, useEffect } from "react"; // Added useEffect
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { formatNumber } from "../utils/helpers";
import { useItemData } from "../hooks/useItemData";
import { useItemPrices } from "../hooks/useItemPrices";
import { IoIosCheckmark } from "react-icons/io";
import CustomDropdown from "./CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setSelectCity, setShowPricedItems } from "../slices/filterSlice";

const commonHoverActiveStyles = `
    hover:bg-gradient-to-b hover:from-stone-800 hover:via-stone-700 hover:to-stone-500
    active:bg-stone-950
    active:scale-95
    transition ease-in-out duration-150
  `;

const focusStyles = `
    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900
  `;

const baseURLimage = "https://render.albiononline.com/v1/item/";

function ShopBuy({
  onShowPanel,
  openDropdown,
  onOpenDropdown,
}) {
  const { itemArray, loading: isItemDataLoading, error: itemDataError } = useItemData();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByPrice, setSortByPrice] = useState(null);
  const {
    selectTier,
    selectEnchantment,
    selectQuality,
    selectType,
    searchTerm,
    selectCity,
    showPricedItems,
  } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const citiesOptions = [
    { name: "Thetford", value: "Thetford" },
    { name: "Bridgewatch", value: "Bridgewatch" },
    { name: "Lymhurst", value: "Lymhurst" },
    { name: "Fort Sterling", value: "Fort Sterling" },
    { name: "Caerleon", value: "Caerleon" },
    { name: "Black Market", value: "Black Market" },
  ];

  const itemsPerPage = 170;

  const filteredItems = useMemo(() => {
    let currentItems = itemArray;

    currentItems = currentItems.filter((item) => {
      const itemId = item.id;
      const isArtifact = itemId.includes("ARTEFACT");
      const isUnique = itemId.startsWith("UNIQUE_");
      const isVanity = itemId.includes("VANITY");
      const isSkin = itemId.includes("SKIN")

      return !isArtifact && !isUnique && !isVanity && !isSkin;
    });

    if (!Array.isArray(currentItems)) {
      return [];
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      currentItems = currentItems.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) || item.id.toLowerCase().includes(lower)
      );
    }

    if (selectTier !== "any") {
      currentItems = currentItems.filter((item) => {
        return item.id.startsWith(`T${selectTier}_`);
      });
    }

    if (selectEnchantment !== "any") {
      currentItems = currentItems.filter((item) => {
        const enchantmentMatch = item.id.match(/@(\d+)$/);
        const itemEnchantment = enchantmentMatch ? enchantmentMatch[1] : "0";

        return itemEnchantment === selectEnchantment;
      });
    }

    if (selectType !== "any") {
      currentItems = currentItems.filter((item) => {
        const parts = item.id.split("_");
        return parts.length > 1 && parts[1] === selectType;
      });
    }

    return currentItems;
  }, [itemArray, searchTerm, selectTier, selectEnchantment, selectType]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  const itemIdsToFetch = useMemo(() => pageItems.map((item) => item.id), [pageItems]);
  const { priceData, isPriceLoading, isPriceFetching } = useItemPrices(
    itemIdsToFetch,
    selectCity,
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
          location: priceInfo?.location ?? selectCity,
        };
      });
  }, [itemArray, priceData, itemIdsToFetch, selectCity, isItemDataLoading]);

  const sortedItems = useMemo(() => {
    let itemsToSort = combinedItemData;

    if (!sortByPrice) {
      return itemsToSort;
    }

    const sorted = [...itemsToSort].sort((a, b) => {
      const priceA = a.sell_price_min;
      const priceB = b.sell_price_min;

      if (sortByPrice === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    return sorted;
  }, [combinedItemData, sortByPrice]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const displayItems = useMemo(() => {
    let itemsToDisplay = sortedItems;

    if (showPricedItems) {
      itemsToDisplay = itemsToDisplay.filter((item) => item.sell_price_min > 0);
    }
    return itemsToDisplay;
  }, [sortedItems, showPricedItems]);

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

  const handleCityChange = (value) => {
    dispatch(setSelectCity(value));
  };

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
        <div className="flex gap-2">
          <h1 className="font-bold mb-1 text-4xl">Market Offers</h1>

          <div className="flex border rounded-full p-[5px] bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] mr-4 mb-2">
            <CustomDropdown
              id="city"
              options={citiesOptions}
              onValueChange={handleCityChange}
              selectedValue={selectCity}
              onOpenDropdown={onOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>
          <div className=" flex items-center justify-start sm:justify-start gap-2 mb-2">
            <button
              type="button"
              id="show-price"
              onClick={() => dispatch(setShowPricedItems(!showPricedItems))}
              className={`text-sm border-3 rounded-full border-gray-500 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 hover:from-stone-800 hover:via-stone-700 hover:to-stone-600 text-[#0c0e0f] cursor-pointer ${
                showPricedItems
                  ? "bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-yellow-700"
                  : ""
              } ${commonHoverActiveStyles} ${focusStyles}`}
            >
              <IoIosCheckmark size={18} style={{ strokeWidth: "8%" }} />
            </button>
            <label htmlFor="show-price" className="text-md text-[black]">
              Show Priced Items
            </label>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr_2fr] border rounded-xl p-1 gap-3 mr-6 bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] items-center">
          <div className="border px-2 py-0.5 rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
            Item
          </div>
          <div className="border px-2 py-0.5 rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
            Duration
          </div>
          <div
            className="border px-2 py-0.5 rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] flex justify-between cursor-pointer"
            onClick={() => {
              setSortByPrice((prevSort) => {
                if (prevSort === "asc") return "desc";
                return "asc";
              });
            }}
          >
            Price
            <div
              className={`size-4 flex items-center justify-center ml-1 transform ${
                sortByPrice === "asc" ? "rotate-180" : "rotate-0"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox={`${sortByPrice === "asc" ? " 0 10 24 24" : "0 0 24 24"}`}
              >
                <path
                  d="M19 14l-7 7-7-7"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="border-t border-b border-[#917663] p-1 mt-2 overflow-auto h-[550px] custom-scrollbar relative">
          {!isPriceLoading &&
            displayItems.length > 0 &&
            displayItems.map((item, i) => (
              <div
                key={`${item.id}-${currentPage}`}
                className={`px-2 py-2 grid grid-cols-[2fr_1fr_2fr] items-center ${
                  i % 2 === 0 ? "bg-[#dab593]" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-22 h-22 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
                    style={{
                      backgroundImage: `url('${baseURLimage}${item?.id}?quality=${selectQuality}')`,
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
                    className=" w-[140px] py-2 border-2 rounded-full text-lg border-gray-500 cursor-pointer shadow-[inset_0_0_10px_1px_#660101] bg-[#b10808] text-yellow-400 hover:opacity-80 active:scale-95"
                    onClick={() => onShowPanel(item, selectQuality)}
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
            className="border-2 rounded-full px-3 size-7 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30 hover:opacity-80"
            disabled={currentPage === 1 || isPriceLoading || isPriceFetching}
            aria-label="Previous Page"
          >
            <RxCaretLeft size={32} className="-left-1 -bottom-1 absolute" />
          </button>
          <p className="text-lg text-[#43342D]">{currentPage}</p>
          <button
            onClick={goToNextPage}
            className="border-2 rounded-full px-3 size-7 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30 hover:opacity-80"
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
