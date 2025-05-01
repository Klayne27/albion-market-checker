import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyItem as buyItemApi } from "../services/apiInventory";

export function useBuyItem() {
  const queryClient = useQueryClient();

  const { mutate: buyItem, isLoading: isBuying } = useMutation({
    mutationFn: buyItemApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });

  return { buyItem, isBuying };
}
