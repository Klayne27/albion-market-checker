import { useQuery } from "@tanstack/react-query";
import { getShop } from "../services/apiShop";

export function useShop() {
  const {
    data: shop,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shop"],
    queryFn: getShop,
  });

  return { shop, isLoading, error };
}
