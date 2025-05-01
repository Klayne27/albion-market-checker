export const getItemPrices = async (itemIdsToFetch, city) => {
  const baseUrl = `https://east.albion-online-data.com/api/v2/stats/prices/`;
  const itemIdsParam = itemIdsToFetch.join(",");
  const locationParam = city ? `?locations=${city}` : "";

  const apiUrl = `${baseUrl}${itemIdsParam}${locationParam}`;

  const res = await fetch(apiUrl);

  if (!res.ok) throw new Error("Error: failed to fetch item prices");

  return res.json();
};

