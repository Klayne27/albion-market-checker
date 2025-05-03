import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./inventorySlice";
import filterReducer from "./filterSlice";

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    filter: filterReducer,
  },
});

export default store;
