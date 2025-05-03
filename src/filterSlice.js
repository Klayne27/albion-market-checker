import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  selectTier: "any",
  selectQuality: "1",
  selectEnchantment: "any",
  selectType: "any",
  showPricedItems: false,
  selectedCity: "Caerleon",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSelectTier(state, action) {
      state.selectTier = action.payload;
    },
    setSelectQuality(state, action) {
      state.selectQuality = action.payload;
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
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
    },
    setShowPricedItems(state, action) {
      state.showPricedItems = action.payload;
    },
    handleResetFilters(state) {
      state.selectQuality = "1";
      state.selectTier = "any";
      state.selectEnchantment = "any";
      state.selectType = "any";
    },
    handleResetSearch(state) {
      state.searchTerm = "";
    },
    handleRefreshMarket(state) {
      state.selectQuality = "1";
      state.selectTier = "any";
      state.selectEnchantment = "any";
      state.selectType = "any";
      state.searchTerm = "";
      state.showPricedItems = false;
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
  setSelectedCity,
  setShowPricedItems,
  handleResetFilters,
  handleResetSearch,
  handleRefreshMarket,
} = filterSlice.actions;
