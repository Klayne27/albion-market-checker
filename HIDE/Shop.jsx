import { useMutation, useQueryClient } from "@tanstack/react-query"; // Or @tanstack/react-query

const API_URL = "http://localhost:3000";

// Assume shop items are static for this example
const shopItems = [
  { id: "great-sword", name: "Great Sword", price: 500 },
  { id: "super-potion", name: "Super Health Potion", price: 150 },
  { id: "wooden-shield", name: "Wooden Shield", price: 200 },
];

// This mutation function handles the purchase logic on the server
async function buyItemMutation(itemToBuy) {
  // 1. Fetch the CURRENT player data from the API
  //    It's important to get the latest state before attempting an update
  const playerResponse = await fetch(`${API_URL}/player`);
  if (!playerResponse.ok) {
    throw new Error("Failed to fetch player data before buying");
  }
  const currentPlayer = await playerResponse.json();

  // 2. Check if player has enough gold
  if (currentPlayer.gold < itemToBuy.price) {
    throw new Error("Not enough gold!"); // This will be caught by onError in useMutation
  }

  // 3. Calculate the new player state
  const newGold = currentPlayer.gold - itemToBuy.price;
  const existingItemIndex = currentPlayer.inventory.findIndex(
    (invItem) => invItem.itemId === itemToBuy.id
  );

  const newInventory = [...currentPlayer.inventory];
  if (existingItemIndex > -1) {
    // Item already exists, just increase quantity
    newInventory[existingItemIndex] = {
      ...newInventory[existingItemIndex],
      quantity: newInventory[existingItemIndex].quantity + 1,
    };
  } else {
    // New item, add it to inventory
    newInventory.push({ itemId: itemToBuy.id, quantity: 1 });
  }

  const updatedPlayer = {
    ...currentPlayer,
    gold: newGold,
    inventory: newInventory,
  };

  // 4. Send the update request to JSON Server
  const updateResponse = await fetch(`${API_URL}/player`, {
    method: "PATCH", // Use PATCH to update parts of the resource
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPlayer),
  });

  if (!updateResponse.ok) {
    throw new Error("Failed to update player data after buying");
  }

  return updateResponse.json(); // Return the updated player data
}

export default function Shop() {
  const queryClient = useQueryClient();

  // Get current player data for display/disabling buttons (optional, could rely solely on mutation logic)
  // const { data: player } = useQuery('playerData', fetchPlayerData); // Uncomment if you want to disable buttons based on gold

  const mutation = useMutation({mutationFn: buyItemMutation, 
    onSuccess: () => {
      // This runs after the mutation function (buyItemMutation) succeeds
      console.log("Purchase successful! Invalidating player data.");
      // Invalidate the 'playerData' query to tell React Query
      // that the cached player data is now stale and needs to be refetched.
      queryClient.invalidateQueries({queryKey: ['playerData']});
    },
    onError: (error) => {
      // Handle errors, e.g., not enough gold
      console.error("Purchase failed:", error.message);
      alert(`Purchase failed: ${error.message}`); // Simple error display
    },
  });

  return (
    <div>
      <h2>Shop</h2>
      <ul>
        {shopItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} Gold
            <button
              onClick={() => mutation.mutate(item)}
              disabled={mutation.isLoading} // Disable button while buying
              // disabled={mutation.isLoading || (player && player.gold < item.price)} // Use this line if you uncommented the player query above
            >
              {mutation.isLoading ? "Buying..." : "Buy"}
            </button>
          </li>
        ))}
      </ul>
      {mutation.isError && (
        <p style={{ color: "red" }}>Error: {mutation.error.message}</p>
      )}
    </div>
  );
}
