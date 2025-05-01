import React, { useState, useMemo } from "react";
import { useItemData } from "../hooks/useItemData";
import { useItemPrices } from "../hooks/useItemPrices";

function PriceFetcher() {
  const { itemArray, loading: isItemDataLoading, error: itemDataError } = useItemData();

  // --- State for User Inputs that Affect Price Fetching ---
  // For this example, we'll just use a selected city state
  const [selectedCity, setSelectedCity] = useState("Thetford"); // Default city

  // --- Options for Cities (Example) ---
  const citiesOptions = [
    { name: "Thetford", value: "Thetford" },
    { name: "Caerleon", value: "Caerleon" },
    { name: "Black Market", value: "Black Market" },
    // Add other cities you want to support
  ];

  // --- Determine which Item IDs to Fetch Prices For ---
  // from the loaded itemArray. In a real app, this list would come from
  // user search/filters applied to the itemArray.
  const itemIdsToFetch = useMemo(() => {
    // Replace this logic with your actual filtering based on user input
    return itemArray.slice(0, 300).map((item) => item.id);
  }, [itemArray]);

  const { priceData, isPriceError, isPriceLoading, priceError, isPriceFetching } =
    useItemPrices(itemIdsToFetch, selectedCity, isItemDataLoading, itemDataError);

  // --- Combine Item Data with Price Data for Display ---
  // Use useMemo to create a combined list for rendering
  const combinedItemData = useMemo(() => {
    if (!itemArray || !priceData) {
      return [];
    }

    // Create a map from price data for quick lookup by item_id
    const priceMap = new Map(priceData.map((item) => [item.item_id, item]));

    // Map over the itemArray (the static list) and add price info
    return itemArray
      .filter((item) => itemIdsToFetch.includes(item.id)) // Only include items that were fetched
      .map((item) => {
        const priceInfo = priceMap.get(item.id); // Get price data using the item ID

        return {
          // Static item info
          id: item.id,
          name: item.name,
          sell_price_min: priceInfo?.sell_price_min ?? "N/A",
          buy_price_max: priceInfo?.buy_price_max ?? "N/A",
          last_updated: priceInfo?.last_updated ?? null,
          location: priceInfo?.location ?? selectedCity,
        };
      });
  }, [itemArray, priceData, itemIdsToFetch, selectedCity]);

  // --- Render the UI ---
  return (
    <div className="container mx-auto p-4 font-sans bg-gray-100 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Albion Online Price Fetcher
      </h1>

      {/* City Selection */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <label
          htmlFor="citySelect"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select City:
        </label>
        <select
          id="citySelect"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white"
        >
          {citiesOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading/Error States */}
      {isItemDataLoading && (
        <p className="text-center text-blue-600 text-lg">Loading item list...</p>
      )}
      {itemDataError && (
        <p className="text-center text-red-600 text-lg">
          Error loading item list: {itemDataError.message}
        </p>
      )}

      {isPriceLoading && !isItemDataLoading && (
        <p className="text-center text-blue-600 text-lg">Fetching prices...</p>
      )}
      {isPriceFetching && !isPriceLoading && (
        <p className="text-center text-blue-600 text-lg">
          Updating prices in background...
        </p>
      )}
      {isPriceError && !isItemDataLoading && (
        <p className="text-center text-red-600 text-lg">
          Error fetching prices: {priceError?.message || "An error occurred."}
        </p>
      )}

      {/* Display Combined Data */}
      {!isItemDataLoading && !itemDataError && !isPriceLoading && !isPriceError && (
        <div>
          {combinedItemData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {combinedItemData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                  {/* Display the human-readable item name */}
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    {item.name}
                  </h2>
                  {/* Display price data */}
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Location:</span>{" "}
                    {citiesOptions.find((opt) => opt.value === item.location)?.name ||
                      item.location}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Lowest Sell Price:</span>{" "}
                    {item.sell_price_min !== "N/A"
                      ? item.sell_price_min.toLocaleString()
                      : "N/A"}{" "}
                    Silver
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Highest Buy Price:</span>{" "}
                    {item.buy_price_max !== "N/A"
                      ? item.buy_price_max.toLocaleString()
                      : "N/A"}{" "}
                    Silver
                  </p>
                  {item.last_updated && (
                    <p className="text-gray-600 text-sm mt-2">
                      <span className="font-medium">Updated:</span>{" "}
                      {new Date(item.last_updated).toLocaleString()}
                    </p>
                  )}
                  {/* Add more details as needed */}
                </div>
              ))}
            </div>
          ) : (
            // Message when no data is found
            <p className="text-center text-gray-600 text-lg">
              {
                itemIdsToFetch.length === 0
                  ? "Select criteria to find items." // Message if no items match filters yet
                  : "No price data available for the selected items and city." // Message if items matched filter but API returned no price
              }
            </p>
          )}
        </div>
      )}
      {/* Display the number of items processed/fetched */}
      {!isItemDataLoading && !itemDataError && (
        <p className="text-center text-gray-700 mt-4">
          Item IDs matching criteria: {itemIdsToFetch.length}. Prices displayed:{" "}
          {combinedItemData.length}.
        </p>
      )}
    </div>
  );
}

export default PriceFetcher; // Export the component
