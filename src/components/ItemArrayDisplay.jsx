import React, { useState, useEffect } from "react";

// --- React Component to Process and Display Data ---
function ItemArrayDisplay() {
  // State to hold the processed array of item objects
  const [itemArray, setItemArray] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // Define the path to your raw data file
  // Assuming itemData.txt is in your project's public folder
  const DATA_FILE_PATH = "/itemData.txt";

  // useEffect hook to fetch and process the data when the component mounts
  useEffect(() => {
    const fetchAndProcessItemData = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors
        const response = await fetch(DATA_FILE_PATH);

        // Check if the fetch was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawItemData = await response.text(); // Get the raw text content

        const processedArray = [];

        // Split the raw data into lines, trim whitespace, and filter out empty lines
        const lines = rawItemData
          .trim()
          .split("\n")
          .filter((line) => line.trim() !== "");

        lines.forEach((line) => {
          // Find the index of the first colon to separate the number
          const firstColonIndex = line.indexOf(":");
          if (firstColonIndex === -1) {
            // console.warn(`Skipping line (no first colon): ${line}`);
            return; // Skip lines without a colon
          }

          // Get the part after the first colon and trim
          const restOfLine = line.substring(firstColonIndex + 1).trim();

          // Find the index of the second colon to separate the item ID and name
          const secondColonIndex = restOfLine.indexOf(":");
          if (secondColonIndex === -1) {
            // console.warn(`Skipping line (no second colon): ${line}`);
            return; // Skip lines that don't have the second colon
          }

          // Extract the UniqueName (before the second colon) and trim
          const uniqueName = restOfLine.substring(0, secondColonIndex).trim();

          // Extract the Display Name (after the second colon) and trim
          const displayName = restOfLine.substring(secondColonIndex + 1).trim();

          // Add the extracted data as an object to the array
          if (uniqueName && displayName) {
            // Ensure both parts were successfully extracted
            processedArray.push({
              id: uniqueName,
              name: displayName,
            });
          } else {
            console.warn(`Skipping line (missing ID or Name after parsing): ${line}`);
          }
        });

        // Update the state with the processed array
        setItemArray(processedArray);
      } catch (err) {
        console.error("Error fetching or processing item data:", err);
        setError(`Failed to load item data: ${err.message}`);
        setItemArray([]); // Clear data on error
      } finally {
        setLoading(false); // Finish loading
      }
    };

    // Call the async fetch and process function
    fetchAndProcessItemData();
  }, [DATA_FILE_PATH]); // Dependency array includes DATA_FILE_PATH (though it's constant)

  // --- Render the UI ---
  return (
    <div className="container mx-auto p-4 font-sans bg-gray-100 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Item Data as Array of Objects</h1>

      {/* Loading indicator */}
      {loading && <p className="text-center text-blue-600">Loading item data...</p>}

      {/* Error message */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Display the data or a message if not loading and no error */}
      {!loading &&
        !error &&
        (itemArray.length > 0 ? (
          <ul className="list-disc list-inside bg-white p-4 rounded shadow max-h-96 overflow-y-auto">
            {/* Map over the processed array and display each item */}
            {itemArray.map((item, index) => (
              <li key={index} className="mb-1 text-gray-700">
                <strong>ID:</strong> {item.id}, <strong>Name:</strong> {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No item data available or found.</p>
        ))}

      {!loading && !error && itemArray.length > 0 && (
        <p className="text-center text-gray-700 mt-4">
          Total items processed: {itemArray.length}
          <img src="https://render.albiononline.com/v1/item/T4_BAG@2.png" alt="T6 Enchanted Bag"></img>
        </p>
      )}
    </div>
  );
}

export default ItemArrayDisplay; // Export the component
