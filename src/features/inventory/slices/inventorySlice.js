import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 1,
  username: "Klayne",
  silver: 10_000_000_000,
  inventory: [],
  isSorted: false,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    buyItem(state, action) {
      const { id, name, quantity, sell_price_min, quality } = action.payload;
      const existingItem = state.inventory.find(
        (item) => item.id === id && item.quality === quality
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.inventory.push({ id, name, quality, quantity, price: sell_price_min });
      }
      state.silver -= sell_price_min * quantity;
    },
    sellItem(state, action) {
      const { itemId, quality, quantity, totalNetSilver } = action.payload;

      const idx = state.inventory.findIndex(
        (item) => item.id === itemId && typeof item.quality === typeof quality
      );

      if (idx !== -1) {
        const existingItem = state.inventory[idx];
        if (existingItem.quantity >= quantity) {
          existingItem.quantity -= quantity;

          state.silver += totalNetSilver;

          if (existingItem.quantity === 0) {
            state.inventory.splice(idx, 1);
          }
        }
      }
    },
    setIsSorted(state) {
      state.isSorted = !state.isSorted
    }
  },
});

export const { buyItem, sellItem, setIsSorted } = inventorySlice.actions;

export default inventorySlice.reducer;

export const selectInventory = (state) => state.inventory;
