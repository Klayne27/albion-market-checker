import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sellItem as sellItemApi } from "../services/apiInventory";

export function useSellItem() {
  const queryClient = useQueryClient();

  const { mutate: sellItem, isLoading: isSelling } = useMutation({
    mutationFn: sellItemApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });

  return { sellItem, isSelling };
}
