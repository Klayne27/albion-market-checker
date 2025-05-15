import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectTier: "All",
  selectQuality: [1, 2, 3, 4, 5],
  selectEnchantment: "All",
  selectType: "All",
  selectCity: "",
  isTierInteracted: false,
  isTypeInteracted: false,
  isEnchantmentInteracted: false,
  isQualityInteracted: false,
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
      state.isTierInteracted = true;
    },
    setSelectQuality(state, action) {
      if (action.payload === "All") {
        state.selectQuality = [1, 2, 3, 4, 5];
      } else {
        state.selectQuality = [action.payload];
      }
      state.isQualityInteracted = true;
    },
    setSelectEnchantment(state, action) {
      state.selectEnchantment = action.payload;
      state.isEnchantmentInteracted = true;
    },
    setSelectType(state, action) {
      state.selectType = action.payload;
      state.isTypeInteracted = true;
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
      state.selectTier = "All";
      state.selectEnchantment = "All";
      state.selectType = "All";
      (state.isQualityInteracted = false),
        (state.isTierInteracted = false),
        (state.isTypeInteracted = false),
        (state.isEnchantmentInteracted = false);
    },
    handleResetSearch(state) {
      state.searchTerm = "";
    },
    handleRefreshMarket(state) {
      state.selectQuality = [1, 2, 3, 4, 5];
      state.selectTier = "All";
      state.selectEnchantment = "All";
      state.selectType = "All";
      state.searchTerm = "";
      state.selectCity = "";
      state.showPricedItems = true;
      (state.isQualityInteracted = false),
        (state.isTierInteracted = false),
        (state.isTypeInteracted = false),
        (state.isEnchantmentInteracted = false);
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

export const selectFilter = (state) => state.filter;
