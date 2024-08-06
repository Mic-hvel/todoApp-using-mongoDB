import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    let headers = {};
    const token = sessionStorage.getItem("token");
    if (token) {
      headers = { Authorization: `${token}` };
    }
    try {
      const userDetails = await fetch("http://localhost:5500/users/user", {
        method: "GET",
        headers,
      });
      const result = await userDetails.json();
      console.log("This is the user state", result);
      return result;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  name: [],
  error: null,
  loading: null,
};

export const nameSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name.push(action.payload);
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.name;

// Action creators are generated for each case reducer function

export default nameSlice.reducer;
