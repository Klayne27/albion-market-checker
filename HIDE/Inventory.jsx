import { useQuery } from "@tanstack/react-query"; // Or @tanstack/react-query

const API_URL = "http://localhost:3000"; // Your JSON Server URL

async function fetchPlayerData() {
  const response = await fetch(`${API_URL}/player`);
  if (!response.ok) {
    throw new Error("Failed to fetch player data");
  }
  return response.json();
}

function Inventory() {
  const {
    data: player,
    isLoading,
    error,
  } = useQuery({ queryKey: ["playerData"], queryFn: fetchPlayerData });



  if (isLoading) return <div>Loading inventory...</div>;
  if (error) return <div>Error loading inventory: {error.message}</div>;

  return (
    <div>
      <h2>Player Inventory</h2>
      <p>Gold: {player.gold}</p>
      <h3>Items:</h3>
      <ul>
        {player.inventory.map((item) => (
          <li key={item.itemId}>
            {item.itemId} (x{item.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
