import { useQuery } from "@tanstack/react-query";
import { getItemPrices } from "../services/apiItemPrices";

export const useItemPrices = (itemIdsToFetch, city, quality, isItemDataLoading, itemDataError) => {
  const {
    data: priceData,
    isLoading: isPriceLoading,
    isError: isPriceError,
    error: priceError,
    isFetching: isPriceFetching,
  } = useQuery({
    queryKey: ["itemPrices", itemIdsToFetch, city, quality],
    queryFn: () => getItemPrices(itemIdsToFetch, city, quality),
    enabled:
      !isItemDataLoading && !itemDataError && itemIdsToFetch.length > 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return { priceData, isPriceLoading, isPriceError, priceError, isPriceFetching };
};
