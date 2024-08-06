import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearchTerm: (state, action) => {
      return (state = action.payload);
    },
    clearSearchTerm: (state) => (state = ""),
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;

export const selectSearchTerm = (state) => state.search;

export default searchSlice.reducer;
