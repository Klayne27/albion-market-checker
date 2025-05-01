const API_URL = "http://localhost:3001/inventory";

export async function getInventory() {
  const res = await fetch(`${API_URL}`);

  if (!res.ok) throw new Error("error fetching data");

  const data = await res.json();

  return data;
}

export async function buyItem(newItem) {
  const currentInventory = await getInventory();

  const existing = currentInventory.inventory.find((item) => item.name === newItem.name);
  let updatedInventoryList;

  if (existing) {
    updatedInventoryList = currentInventory.inventory.map((item) =>
      item.name === newItem.name
        ? { ...item, quantity: item.quantity + newItem.quantity }
        : item
    );
  } else {
    updatedInventoryList = [
      ...currentInventory.inventory,
      {
        name: newItem.name,
        quantity: newItem.quantity,
        price: newItem.price,
      },
    ];
  }

  const updatedInventory = {
    ...currentInventory,
    silver: currentInventory.silver - newItem.price,
    inventory: updatedInventoryList,
  };

  const res = await fetch(`${API_URL}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedInventory),
  });

  if (!res.ok) throw new Error("error buying item");
  return res.json();
}

export async function sellItem(itemName) {
  const currentInventory = await getInventory();

  const existing = currentInventory.inventory.find((item) => item.name === itemName);

  const updatedInventoryList = currentInventory.inventory
    .map((item) =>
      item.name === itemName ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter((item) => item.quantity > 0);

  const updatedInventory = {
    ...currentInventory,
    silver: currentInventory.silver + Math.floor(existing.price / 1.25),
    inventory: updatedInventoryList,
  };

  const res = await fetch(`${API_URL}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedInventory),
  });

  if (!res.ok) throw new Error("error selling item");
  return res.json();
}
