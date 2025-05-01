import { useQuery } from "@tanstack/react-query";
import { getInventory } from "../services/apiInventory";

export function useInventory() {
  const {
    data: inventory,
    isLoading: isLoadingInv,
    error,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventory
  });

  return { inventory, isLoadingInv, error };
}
