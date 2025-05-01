const API_URL = "http://localhost:3002/shop";

export async function getShop() {
  const res = await fetch(`${API_URL}`);

  if (!res.ok) throw new Error("error fetching shop");

  const data = await res.json();

  return data;
}
