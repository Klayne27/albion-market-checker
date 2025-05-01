import { useQuery } from "@tanstack/react-query";
import { getItemPrices } from "../services/apiItemPrices";

export const useItemPrices = (itemIdsToFetch, city, isItemDataLoading, itemDataError) => {
  const {
    data: priceData,
    isLoading: isPriceLoading,
    isError: isPriceError,
    error: priceError,
    isFetching: isPriceFetching,
  } = useQuery({
    queryKey: ["itemPrices", itemIdsToFetch, city],
    queryFn: () => getItemPrices(itemIdsToFetch, city),
    enabled:
      !isItemDataLoading && !itemDataError && itemIdsToFetch.length > 0 && city !== "",

    // Use a short staleTime for market data as it changes frequently.
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return { priceData, isPriceLoading, isPriceError, priceError, isPriceFetching };
};
