import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: [],
  reducers: {
    taskToggled: (state, action) => {
      return {
        task: state.task.map((todo) => {
          if (todo.id !== action.payload) {
            return todo;
          }

          return {
            isCompleted: !todo.isCompleted,
          };
        }),
      };
    },
  },
});

export const { toggleCompleted } = toggleSlice.actions;

export default toggleSlice.reducer;
