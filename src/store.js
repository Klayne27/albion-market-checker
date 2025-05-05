import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./features/inventory/slices/inventorySlice";
import filterReducer from "./features/shop/slices/filterSlice";

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    filter: filterReducer,
  },
});

export default store;
