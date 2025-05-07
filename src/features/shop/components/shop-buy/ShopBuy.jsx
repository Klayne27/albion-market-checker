import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useItemData } from "../../../../hooks/useItemData";
import { useItemPrices } from "../../../../hooks/useItemPrices";
import { IoIosCheckmark } from "react-icons/io";
import CustomDropdown from "../../../../components/ui/CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setSelectCity,
  setShowPricedItems,
} from "../../slices/filterSlice";
import { citiesOptions } from "../../../../data/itemOptions";
import Loader from "../../../../components/ui/Loader";
import ShopPagination from "../pagination/ShopPagination";
import ShopBuyItemList from "./ShopBuyItemList";
import Error from "../../../../components/ui/Error";
import { selectShop, setCurrentPage } from "../../slices/shopSlice";

const commonHoverActiveStyles = `
    hover:bg-gradient-to-b hover:from-stone-800 hover:via-stone-700 hover:to-stone-500
    active:bg-stone-950
    active:scale-95
    transition ease-in-out duration-150
  `;

const focusStyles = `
    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900
  `;

const MAX_URL_LENGTH = 4096;
const URL_OVERHEAD_ESTIMATE = 299;

const MAX_ITEM_IDS_PARAM_LENGTH = MAX_URL_LENGTH - URL_OVERHEAD_ESTIMATE;

function ShopBuy({ onShowPanel }) {
  const { itemArray, loading: isItemDataLoading, error: itemDataError } = useItemData();
  const itemNameMap = useMemo(() => {
    const map = new Map();
    if (Array.isArray(itemArray)) {
      itemArray.forEach((item) => map.set(item.id, item.name));
    }
    return map;
  }, [itemArray]);

  const {currentPage} = useSelector(selectShop)
  const [sortByPrice, setSortByPrice] = useState("asc");
  const {
    selectTier,
    selectEnchantment,
    selectQuality,
    selectType,
    searchTerm,
    selectCity,
    showPricedItems,
  } = useSelector(selectFilter);

  const dispatch = useDispatch();

  const itemsPerPage = 299;

  const filteredItems = useMemo(() => {
    let currentItems = itemArray;

    currentItems = currentItems.filter((item) => {
      const itemId = item.id;
      const isUnique = itemId.startsWith("UNIQUE_");
      const isVanity = itemId.includes("VANITY");
      const isSkin = itemId.includes("SKIN");

      return !isUnique && !isVanity && !isSkin;
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
  }, [itemArray, searchTerm, selectTier, selectEnchantment, selectType]);

  const itemIdsForApiFetch = useMemo(() => {
    if (!Array.isArray(filteredItems) || filteredItems.length === 0) {
      return [];
    }

    const ids = [];
    let currentLength = 0;

    for (const item of filteredItems) {
      const itemId = item.id;
      if (!itemId || typeof itemId !== "string") {
        console.warn("Skipping item with invalid ID:", item);
        continue;
      }

      const lengthAfterAdding =
        ids.length === 0 ? itemId.length : currentLength + 1 + itemId.length;

      if (lengthAfterAdding > MAX_ITEM_IDS_PARAM_LENGTH) {
        break;
      }

      ids.push(itemId);
      currentLength = lengthAfterAdding;
    }

    if (ids.length === 0 && filteredItems.length > 0) {
      console.warn(
        "First item ID alone exceeds URL length limit after overhead for current filters."
      );
    }

    return ids;
  }, [filteredItems]);

  const { priceData, isPriceLoading, isPriceFetching } = useItemPrices(
    itemIdsForApiFetch,
    selectCity,
    selectQuality,
    isItemDataLoading,
    itemDataError
  );

  const isLoading = isPriceFetching || isPriceLoading;

  const combinedItemData = useMemo(() => {
    if (isItemDataLoading || !Array.isArray(itemArray) || !Array.isArray(priceData)) {
      return [];
    }

    let listings = priceData;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      listings = listings.filter((priceItem) => {
        const itemName = itemNameMap.get(priceItem.item_id) || priceItem.item_id;
        return (
          itemName.toLowerCase().includes(lower) ||
          priceItem.item_id.toLowerCase().includes(lower)
        );
      });
    }

    if (selectTier !== "All") {
      listings = listings.filter((priceItem) => {
        return priceItem.item_id.startsWith(`T${selectTier}_`);
      });
    }

    if (selectEnchantment !== "All") {
      listings = listings.filter((priceItem) => {
        const enchantmentMatch = priceItem.item_id.match(/@(\d+)$/);
        const itemEnchantment = enchantmentMatch ? enchantmentMatch[1] : "0";
        return itemEnchantment === selectEnchantment;
      });
    }

    if (selectType !== "All") {
      listings = listings.filter((priceItem) => {
        if (typeof priceItem.item_id !== "string" || priceItem.item_id === "") {
          return false;
        }

        const id = priceItem.item_id;
        const firstUnderscoreIndex = id.indexOf("_");

        const segmentAfterFirstUnderscore = id.substring(firstUnderscoreIndex + 1);

        const selectTypeLower = selectType.toLowerCase();
        const segmentLower = segmentAfterFirstUnderscore.toLowerCase();

        return segmentLower.startsWith(selectTypeLower);
      });
    }

    if (showPricedItems) {
      listings = listings.filter((priceItem) => priceItem.sell_price_min > 0);
    }

    listings = listings.filter((priceItem) => {
      return typeof priceItem.item_id === "string" && priceItem.item_id !== "";
    });

    return listings.map((priceItem) => {
      const itemName = itemNameMap.get(priceItem.item_id) || priceItem.item_id;
      return {
        id: priceItem.item_id,
        quality: priceItem.quality,
        city: priceItem.city,
        sell_price_min: priceItem.sell_price_min,
        sell_price_min_date: priceItem.sell_price_min_date,
        sell_price_max: priceItem.sell_price_max,
        name: itemName,
        _key_suffix: `${priceItem.item_id}-${priceItem.city || ""}-${priceItem.quality}`,
      };
    });
  }, [
    itemArray,
    priceData,
    itemNameMap,
    selectTier,
    selectEnchantment,
    selectType,
    searchTerm,
    showPricedItems,
    isItemDataLoading,
  ]);

  const sortedItems = useMemo(() => {
    let itemsToSort = combinedItemData;

    if (!sortByPrice) {
      return [...itemsToSort].sort((a, b) => {
        if (a.id !== b.id) return a.id.localeCompare(b.id);
        if (a.quality !== b.quality) return a.quality - b.quality;
        return a.city.localeCompare(b.city);
      });
    }

    const sorted = [...itemsToSort].sort((a, b) => {
      const priceA = a.sell_price_min;
      const priceB = b.sell_price_min;

      if (sortByPrice === "asc") {
        if (priceA === 0 && priceB === 0) {
          if (a.quality !== b.quality) return a.quality - b.quality;
          return a.city.localeCompare(b.city);
        }
        if (priceA === 0) return 1;
        if (priceB === 0) return -1;
        return priceA - priceB;
      } else {
        if (priceA === 0 && priceB === 0) {
          if (a.quality !== b.quality) return b.quality - a.quality;
          return b.city.localeCompare(a.city);
        }
        if (priceA === 0) return 1;
        if (priceB === 0) return -1;
        return priceB - priceA;
      }
    });

    return sorted;
  }, [combinedItemData, sortByPrice]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [
    searchTerm,
    selectCity,
    selectTier,
    selectEnchantment,
    selectQuality,
    selectType,
    showPricedItems,
    dispatch
  ]);

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedItems.slice(start, start + itemsPerPage);
  }, [itemsPerPage, currentPage, sortedItems]);

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  const handleCityChange = (value) => {
    dispatch(setSelectCity(value));
  };

  if (isItemDataLoading) return <Loader />;
  if (itemDataError) return <Error />;

  return (
    <div className="p-2">
      <div className="border px-3 py-3 bg-[#e4bb93] shadow-[inset_0_0_25px_15px_#eca966]">
        <div className="flex gap-2">
          <h1 className="font-bold mb-1 text-3xl">Market Offers</h1>

          <div className="flex border rounded-full p-[4px] bg-gradient-to-b from-[#716F7B] via-[#4c4a50] to-[#38373b] mr-4 mb-2">
            <CustomDropdown
              id="city"
              options={citiesOptions}
              onValueChange={handleCityChange}
              selectedValue={selectCity}
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
          <div className="border px-2  rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
            Item
          </div>
          <div className="border px-2  rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966]">
            Posted
          </div>
          <div
            className="border px-2 rounded-lg text-sm bg-[#FBD7A6] shadow-[inset_0_0_10px_2px_#eca966] flex justify-between cursor-pointer hover:opacity-80"
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

        <div className="border-t border-b border-[#917663] p-1 mt-2 overflow-auto h-[440px] custom-scrollbar relative">
          {!isPriceLoading &&
            pageItems.length > 0 &&
            pageItems.map((item, i) => (
              <ShopBuyItemList
                item={item}
                i={i}
                onShowPanel={onShowPanel}
                key={`${item.id}-${item.quality}-${i}`}
              />
            ))}

          {!isPriceLoading && pageItems.length === 0 && searchTerm && (
            <p className="text-center text-[#4e2c08] p-4">
              No items exactly match "{searchTerm}" on this page.
            </p>
          )}
          {!isPriceLoading &&
            pageItems.length === 0 &&
            !searchTerm &&
            !isPriceFetching && (
              <p className="text-center text-[#4e2c08] p-4">
                No items to display on this page.
              </p>
            )}
        </div>

        <ShopPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default ShopBuy;
