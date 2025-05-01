import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
// import { useBuyItem } from "../hooks/useBuyItem"; // Keep if needed for buy logic
// import { useShop } from "../hooks/useShop"; // Keep if needed for live market data
import { useState, useMemo } from "react"; // Import useMemo
import { formatNumber } from "../utils/helpers";

// Receive itemArray, loading, and error as props from the parent (Shop)
function ShopBuy({ onShowPanel, itemArray, isItemDataLoading, itemDataError }) {
  // const { shop, isLoading } = useShop(); // Keep if fetching live market data separately
  // const { buyItem, isBuying } = useBuyItem(); // Keep if needed

  // --- State for Filtering ---
  // You'll need state for the selected filter values from the dropdowns
  // For this example, we'll just use the itemArray directly, but you'd add state here
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [selectedType, setSelectedType] = useState('');
  // const [selectedTier, setSelectedTier] = useState('');
  // const [selectedEnchantment, setSelectedEnchantment] = useState('');
  // const [selectedQuality, setSelectedQuality] = useState('');
  // const [searchTerm, setSearchTerm] = useState(''); // For the search input

  const [currentPage, setCurrentPage] = useState(1);

  // --- Filtering Logic ---
  // Use useMemo to filter the itemArray based on selected filters
  // This prevents re-filtering on every render if filters haven't changed
  const filteredItems = useMemo(() => {
    // Start with the full itemArray received from the parent
    let items = itemArray;

    // --- Apply your filtering logic here based on state variables ---
    // Example (you'll need to implement the actual filtering based on item.id and item.name)
    // if (searchTerm) {
    //     items = items.filter(item =>
    //         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         item.id.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    // }
    // if (selectedTier) {
    //      items = items.filter(item => item.id.startsWith(`T${selectedTier}_`));
    // }
    // // ... add logic for category, type, enchantment, quality filters ...

    return items; // Return the filtered array
  }, [itemArray]); // Add filtering state variables as dependencies here

  // --- Pagination Logic ---
  const itemsPerPage = 30; // Items per page
  const totalItems = filteredItems.length; // Use the length of the filtered array
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage); // Slice the filtered array

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Reset page to 1 when filters change
  // useEffect(() => {
  //    setCurrentPage(1);
  // }, [filteredItems]); // Re-run when the filteredItems array changes

  // Display loading/error states from the parent
  if (isItemDataLoading) return <p>Loading Item List...</p>;
  if (itemDataError)
    return <p className="text-red-500">Error loading item list: {itemDataError}</p>;
  // You might also want to show loading for the useShop hook if it's active

  return (
    <div className="p-2">
      <div className="border px-3 py-2 bg-[#EDC298]">
        <h1 className="font-bold mb-1 text-2xl">Market Offers</h1>

        <div className="grid grid-cols-[2fr_1fr_2fr] border rounded-lg p-1 gap-3 mr-6 bg-[#716F7B]">
          <div className="border px-2 rounded-md text-xs bg-[#FBD7A6]">Item</div>
          <div className="border px-2 rounded-md text-xs bg-[#FBD7A6]">Duration</div>
          <div className="border px-2 rounded-md text-xs bg-[#FBD7A6]">Price</div>
        </div>

        <div className="border-t border-b border-[#917663] p-1 mt-2 overflow-auto h-96 custom-scrollbar">
          {/* Map over the currentItems (paginated and filtered) */}
          {currentItems.length > 0 ? (
            currentItems.map((item, i) => (
              <div
                // Use item.id as the key (assuming IDs are unique)
                key={item.id}
                className={`px-2 py-6 grid grid-cols-[2fr_1fr_2fr] justify-between ${
                  i % 2 === 0 ? "bg-[#D4B394]" : ""
                }`}
              >
                {/* Display the item.name (human-readable) */}
                <p className="mr-2 border-[#917663] text-[#4e2c08]">{item.name}</p>
                {/* Placeholder/Example data for Duration and Price */}
                {/* You will need to integrate data from your useShop hook here */}
                <p className="ml-7 border-[#917663] text-[#4e2c08]">N/A</p>{" "}
                {/* Placeholder Duration */}
                <div className="flex justify-between ml-10">
                  <span className="text-[#4e2c08]">🪩N/A</span> {/* Placeholder Price */}
                  <button
                    type="button"
                    className=" px-8 py-1 border-3 rounded-full text-sm  border-gray-500 cursor-pointer bg-gradient-to-b from-[#660101] via-[#7c0101] to-[#c70101] text-yellow-400 hover:from-[#7a0101] hover:via-[#700101] hover:to-[#a80101] active:from-[#520101] active:via-[#690101] active:to-[#970202]"
                    // onClick={() => onShowPanel(item)} // Pass the static item info for now
                    // You'll need to pass combined static + live data later
                    disabled={true} // Disable buy button as price data is missing
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Message when no items match the filter
            <p className="text-center text-gray-600">
              No items found matching your criteria.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalItems > itemsPerPage && ( // Only show pagination if there's more than one page
          <div className="flex justify-center gap-4 mt-3 items-center">
            <span className="border h-0 w-full border-[#917663]"></span>
            <button
              onClick={goToPrevPage}
              className="border-2 rounded-full px-2 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30"
              disabled={currentPage === 1}
            >
              <RxCaretLeft size={25} className="-left-1 -bottom-1 absolute" />
            </button>
            <p className="text-sm text-[#43342D] font-bold">
              {currentPage} / {totalPages}
            </p>{" "}
            {/* Show current/total pages */}
            <button
              onClick={goToNextPage}
              className="border-2 rounded-full px-2 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30"
              disabled={currentPage === totalPages}
            >
              <RxCaretRight size={25} className="-left-1 -bottom-1 absolute" />
            </button>
            <span className="border h-0 w-full border-[#917663]"></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopBuy;
