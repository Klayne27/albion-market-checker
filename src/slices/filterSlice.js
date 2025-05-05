import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectTier: "any",
  selectQuality: [1, 2, 3, 4, 5],
  selectEnchantment: "any",
  selectType: "any",
  selectCity: "Thetford",
  searchTerm: "",
  showPricedItems: true,
  openDropdown: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSelectTier(state, action) {
      state.selectTier = action.payload;
    },
    setSelectQuality(state, action) {
      if (action.payload === "all") {
        state.selectQuality = [1, 2, 3, 4, 5];
      } else {
        state.selectQuality = [action.payload];
      }
    },
    setSelectEnchantment(state, action) {
      state.selectEnchantment = action.payload;
    },
    setSelectType(state, action) {
      state.selectType = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectCity(state, action) {
      state.selectCity = action.payload;
    },
    setShowPricedItems(state, action) {
      state.showPricedItems = action.payload;
    },
    handleResetFilters(state) {
      state.selectQuality = [1, 2, 3, 4, 5];
      state.selectTier = "any";
      state.selectEnchantment = "any";
      state.selectType = "any";
    },
    handleResetSearch(state) {
      state.searchTerm = "";
    },
    handleRefreshMarket(state) {
      state.selectQuality = [1, 2, 3, 4, 5];
      state.selectTier = "any";
      state.selectEnchantment = "any";
      state.selectType = "any";
      state.searchTerm = "";
      state.showPricedItems = true;
    },
    handleToggleDropdown(state, action) {
      state.openDropdown = state.openDropdown === action.payload ? null : action.payload;
    },
  },
});

export default filterSlice.reducer;

export const {
  setSearchTerm,
  setSelectEnchantment,
  setSelectQuality,
  setSelectTier,
  setSelectType,
  setSelectCity,
  setShowPricedItems,
  handleResetFilters,
  handleResetSearch,
  handleRefreshMarket,
  handleToggleDropdown,
} = filterSlice.actions;
