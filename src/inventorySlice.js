import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 1,
  username: "Klayne",
  silver: 98500000,
  inventory: [], 
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    buyItem: (state, action) => {
      const {id, name, quantity, sell_price_min } = action.payload;
      const existingItem = state.inventory.find((item) => item.name ===  id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.inventory.push({id, name, quantity, price: sell_price_min });
      }
      state.silver -= sell_price_min * quantity;
    },

    sellItem: (state, action) => {
      const itemName = action.payload;
      const idx = state.inventory.findIndex((item) => item.name === itemName);

      if (idx !== -1) {
        const existingItem = state.inventory[idx];
        existingItem.quantity -= 1;
        state.silver += Math.floor(existingItem.price * 0.8);

        if (existingItem.quantity <= 0) {
          state.inventory.splice(idx, 1);
        }
      }
    },

    loadInventory: (state, action) => {
      const { id, username, silver, inventory } = action.payload;
      state.id = id;
      state.username = username;
      state.silver = silver;
      state.inventory = inventory;
    },
  },
});

export const { buyItem, sellItem, loadInventory } = inventorySlice.actions;

export default inventorySlice.reducer;

export const selectInventory = (state) => state.inventory;
