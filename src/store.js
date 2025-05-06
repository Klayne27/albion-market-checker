import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./features/inventory/slices/inventorySlice";
import filterReducer from "./features/shop/slices/filterSlice";
import shopReducer from "./features/shop/slices/shopSlice";

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    filter: filterReducer,
    shop: shopReducer,
  },
});

export default store;
