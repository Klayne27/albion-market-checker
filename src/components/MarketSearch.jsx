import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query"; // Import useQuery

// --- Item Name Mapping Data ---
// This map should ideally contain ALL possible item IDs you might search for.
// For this example, we'll use the ones provided earlier.
const itemNamesMap = {
  UNIQUE_HIDEOUT: "Hideout Construction Kit",
  T3_2H_TOOL_TRACKING: "Journeyman's Tracking Toolkit",
  T4_2H_TOOL_TRACKING: "Adept's Tracking Toolkit",
  T5_2H_TOOL_TRACKING: "Expert's Tracking Toolkit",
  T6_2H_TOOL_TRACKING: "Master's Tracking Toolkit",
  T7_2H_TOOL_TRACKING: "Grandmaster's Tracking Toolkit",
  T8_2H_TOOL_TRACKING: "Elder's Tracking Toolkit",
  T1_FARM_CARROT_SEED: "Carrot Seeds",
  T2_FARM_BEAN_SEED: "Bean Seeds",
  T3_FARM_WHEAT_SEED: "Wheat Seeds",
  T4_FARM_TURNIP_SEED: "Turnip Seeds",
  T5_FARM_CABBAGE_SEED: "Cabbage Seeds",
};

// --- Helper Function to Filter Item IDs ---
// This function replicates the logic of the PHP searchItem function
// but operates on the client-side itemNamesMap.
const filterItemIds = (searchWord, tier, enchantment, itemMap) => {
  const filteredIds = Object.keys(itemMap).filter((itemId) => {
    const itemName = itemMap[itemId];

    // 1. Filter by search word (case-insensitive)
    // If searchWord is empty, this condition is true for all items
    const matchesSearch =
      searchWord === "" || itemName.toLowerCase().includes(searchWord.toLowerCase());

    // 2. Filter by tier
    // If tier is empty, this condition is true for all items
    const matchesTier = tier === "" || itemId.startsWith(`T${tier}_`);

    // 3. Filter by enchantment
    // If enchantment is empty, this condition is true for all items
    let matchesEnchantment = true;
    if (enchantment !== "") {
      if (enchantment === "0") {
        // PHP uses "0" for no enchantment
        matchesEnchantment = !itemId.includes("@"); // Item ID should NOT contain '@'
      } else {
        // Specific enchantment level (e.g., "@1", "@2")
        matchesEnchantment = itemId.includes(`@${enchantment}`);
      }
    }

    return matchesSearch && matchesTier && matchesEnchantment;
  });

  // The API has a limit on the number of items you can request at once.
  // It's good practice to limit the number of IDs sent. Let's limit to 50 for example.
  return filteredIds.slice(0, 50); // Limit the number of item IDs for the API call
};

// --- React Functional Component ---
function MarketSearch() {
  // --- State for User Inputs ---
  const [itemSearch, setItemSearch] = useState("");
  const [city, setCity] = useState(""); // Default to empty string for "All Cities"
  const [tier, setTier] = useState(""); // Default to empty string for "All Tiers"
  const [enchantment, setEnchantment] = useState(""); // Default to empty string for "All Enchantments"

  // --- Options for Dropdowns (from PHP code) ---
  // Use an array of objects for easier mapping in React select
  const citiesOptions = [
    { name: "All Cities", value: "" },
    { name: "Brecilien", value: "5003" }, // Note: Brecilien uses a numeric ID in AODP
    { name: "Lymhurst", value: "Lymhurst" },
    { name: "Bridgewatch", value: "Bridgewatch" },
    { name: "Fort Sterling", value: "Fort Sterling" },
    { name: "Martlock", value: "Martlock" },
    { name: "Thetford", value: "Thetford" },
    { name: "Caerleon", value: "Caerleon" },
  ];
  const tiersOptions = ["All Tiers", 1, 2, 3, 4, 5, 6, 7, 8].map((t) => ({
    name: t === "All Tiers" ? t : `Tier ${t}`, // Display "Tier X"
    value: t === "All Tiers" ? "" : t.toString(), // Use empty string for "All"
  }));
  const enchantmentsOptions = ["All Enchantments", 0, 1, 2, 3, 4].map((e) => ({
    name: e === "All Enchantments" ? e : e === 0 ? "No Enchantment" : `Enchantment .${e}`, // Display "No Enchantment" or "Enchantment .X"
    value: e === "All Enchantments" ? "" : e.toString(), // Use empty string for "All"
  }));

  // --- Memoize filtered item IDs based on inputs ---
  // This recalculates the list of item IDs to fetch only when inputs change.
  // Using useMemo prevents unnecessary re-filtering on every render.
  const itemsToFetch = useMemo(() => {
    // If itemSearch is empty and no other filters are set, don't return IDs initially
    // This prevents fetching all items when the component first loads with no criteria.
    if (!itemSearch && tier === "" && enchantment === "") {
      return [];
    }
    // Otherwise, filter the item IDs based on current inputs
    return filterItemIds(itemSearch, tier, enchantment, itemNamesMap);
  }, [itemSearch, tier, enchantment, itemNamesMap]); // Dependencies for memoization

  // --- react-query useQuery Hook for Data Fetching ---
  const { data, isLoading, isError, error } = useQuery({
    // Query Key: Unique identifier for this query.
    // It should change whenever the data you want to fetch changes (based on inputs).
    // Including itemsToFetch and city ensures react-query refetches when these change.
    queryKey: ["marketPrices", itemsToFetch, city],

    // Query Function: The function that performs the data fetching.
    queryFn: async () => {
      // ** Construct the API URL **
      // This part is crucial and depends on the specific API you use (e.g., AODP)
      // Example using AODP structure for East server:
      // https://east.albion-online-data.com/api/v2/stats/prices/[item1],[item2]?locations=[location1],[location2]
      const server = "east"; // Or 'west' - you might want to make this configurable
      const locationParam = city ? `?locations=${city}` : ""; // Add location param if city is selected

      // Join the filtered item IDs with commas for the API endpoint
      const itemIdsParam = itemsToFetch.join(",");

      const apiUrl = `https://${server}.albion-online-data.com/api/v2/stats/prices/${itemIdsParam}${locationParam}`;

      console.log("Fetching from URL:", apiUrl); // Log the URL for debugging

      const response = await fetch(apiUrl);

      if (!response.ok) {
        // Attempt to read error body if available
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
      }

      const data = await response.json();

      // --- Process the fetched data: Replace item_id with human-readable name ---
      // The fetched data is expected to be an array of price objects.
      const processedData = data.map((item) => ({
        ...item, // Keep all original properties (sell_price_min, buy_price_max, etc.)
        // Replace the item_id property with the display name from the map.
        // Use a fallback string if the item_id is not found in our map.
        item_id: itemNamesMap[item.item_id] || `Unknown: ${item.item_id}`,
      }));

      return processedData; // Return the processed data
    },

    // Options: Configure the query behavior
    // enabled: Only run the query if this is true.
    // We enable the query only if there are items to fetch AND a city is selected.
    enabled: itemsToFetch.length > 0 && city !== "",

    // staleTime: Data is considered fresh for this duration (ms).
    // Use a short time for market data as it changes frequently.
    staleTime: 1000 * 60 * 5, // 5 minutes

    // refetchOnWindowFocus: Refetch data when the window regains focus.
    refetchOnWindowFocus: true, // Good for market data

    // retry: Number of times to retry on failure.
    retry: 2,
  });

  // Assign the fetched data (or empty array if not loaded/error) to marketData for rendering
  const marketData = data || [];

  // --- Render the UI ---
  return (
    <div className="container mx-auto p-4 font-sans bg-gray-100 min-h-screen rounded-lg shadow-lg">
      {" "}
      {/* Using Tailwind classes */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Albion Online Market Price Checker
      </h1>
      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 bg-white p-6 rounded-lg shadow">
        {/* Item Search Input */}
        <div>
          <label
            htmlFor="itemSearch"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Item Name
          </label>
          <input
            type="text"
            id="itemSearch"
            value={itemSearch}
            onChange={(e) => setItemSearch(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="e.g., Carrot Seeds"
          />
        </div>

        {/* City Dropdown */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white"
          >
            {citiesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tier Dropdown */}
        <div>
          <label htmlFor="tier" className="block text-sm font-medium text-gray-700 mb-1">
            Tier
          </label>
          <select
            id="tier"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white"
          >
            {tiersOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Enchantment Dropdown */}
        <div>
          <label
            htmlFor="enchantment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enchantment
          </label>
          <select
            id="enchantment"
            value={enchantment}
            onChange={(e) => setEnchantment(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white"
          >
            {enchantmentsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Loading indicator */}
      {isLoading && (
        <p className="text-center text-blue-600 text-lg">Loading prices...</p>
      )}
      {/* Error message */}
      {isError && (
        <p className="text-center text-red-600 text-lg">
          {error?.message || "An error occurred."}
        </p>
      )}
      {/* Display the prices once loaded and no error */}
      {!isLoading && !isError && (
        <div>
          {marketData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                  {/* Display the human-readable item name */}
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    {item.item_id}
                  </h2>
                  {/* Display other relevant price data from the API */}
                  {/* Find the city name from the value */}
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Location:</span>{" "}
                    {citiesOptions.find((opt) => opt.value === item.location)?.name ||
                      item.location}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Lowest Sell Price:</span>{" "}
                    {item.sell_price_min > 0
                      ? item.sell_price_min.toLocaleString()
                      : "N/A"}{" "}
                    Silver
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Highest Buy Price:</span>{" "}
                    {item.buy_price_max > 0 ? item.buy_price_max.toLocaleString() : "N/A"}{" "}
                    Silver
                  </p>
                  {/* Add more details as provided by the API */}
                  {item.sell_price_min_date && (
                    <p className="text-gray-600 text-sm mt-2">
                      <span className="font-medium">Sell Price Updated:</span>{" "}
                      {new Date(item.sell_price_min_date).toLocaleString()}
                    </p>
                  )}
                  {item.buy_price_max_date && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Buy Price Updated:</span>{" "}
                      {new Date(item.buy_price_max_date).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Message when no data is found or search criteria are needed
            <p className="text-center text-gray-600 text-lg">
              {itemSearch || tier !== "" || enchantment !== "" || city !== ""
                ? "No items found matching your criteria or no data available for the selected city."
                : "Enter item name, tier, or enchantment and select a city to find market prices."}
            </p>
          )}
        </div>
      )}
      {/* Display the number of items found/fetched */}
      {/* Note: itemsToFetch.length indicates how many IDs matched the filter,
                  marketData.length indicates how many prices were returned by the API.
                  These might differ if the API doesn't have data for all requested items. */}
      {!isLoading && !isError && itemsToFetch.length > 0 && (
        <p className="text-center text-gray-700 mt-4">
          Found {itemsToFetch.length} item ID(s) matching criteria. Displaying prices for{" "}
          {marketData.length} items.
        </p>
      )}
    </div>
  );
}

export default MarketSearch; // Export the component
