export const getItemPrices = async (itemIdsToFetch, city, quality) => {
  const baseUrl = `https://east.albion-online-data.com/api/v2/stats/prices/`;
  const itemIdsParam = itemIdsToFetch.join(",");

  let apiUrl = `${baseUrl}${itemIdsParam}`;
  const queryParams = [];

  if (city && city !== "") {
    queryParams.push(`locations=${city}`);
  }

  if (quality && quality.length > 0) {
    queryParams.push(`qualities=${quality.join(",")}`);
  } else {
    console.warn(
      "getItemPrices called without a quality parameter. Defaulting to quality=1"
    );
    queryParams.push("qualities=1,2,3,4,5");
  }

  if (queryParams.length > 0) {
    apiUrl += `?${queryParams.join("&")}`;
  }

  const res = await fetch(apiUrl);

  if (!res.ok) {
    const errorDetail = await res.text();
    throw new Error(
      `Error fetching item prices: ${res.status} ${res.statusText} - Details: ${errorDetail} - URL: ${apiUrl}`
    );
  }

  return res.json();
};
