import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { selectSearchTerm } from "../search/searchSlice";

export const fetchTodoTask = createAsyncThunk(
  "todos/fetchTodoTask",
  async () => {
    let headers = {};
    const token = sessionStorage.getItem("token");
    if (token) {
      headers = { Authorization: `${token}` };
    }
    try {
      const userDetails = await fetch("http://localhost:5500/todo/tasks", {
        method: "GET",
        headers,
      });
      const result = await userDetails.json();
      return result;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoToggled: (state, action) => {
      return {
        ...state,
        todos: Object.values(state.todos).map((todo) => {
          if (todo.id !== action.payload) {
            return todo;
          }
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodoTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodoTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { todoToggled } = todosSlice.actions;

const selectAllTasks = (state) => state.todos.todos;

export default todosSlice.reducer;

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectSearchTerm],
  (todos, search) =>
    todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    )
);
