import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./slices/inventorySlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    filter: filterReducer,
  },
});

export default store;
