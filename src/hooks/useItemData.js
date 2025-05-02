import { useQuery } from "@tanstack/react-query";
import { getItemData } from "../services/apiItemData";

function useItemData() {
  const {
    data: itemArray,
    isLoading: isItemDataLoading,
    isError: isItemDataError,
    error: itemDataError,
  } = useQuery({
    queryKey: ["itemData"],
    queryFn: getItemData,

    // Options: Configure the query behavior for this static data
    // staleTime: Set a very high staleTime or Infinity for static data
    // so it's considered fresh forever after the first fetch.
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return {
    itemArray: itemArray || [],
    loading: isItemDataLoading,
    error: isItemDataError ? itemDataError : null,
  };
}

export { useItemData };
