import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSpecificTask = createAsyncThunk(
  "task/fetchSpecificTask",
  async (id) => {
    let headers = {};
    const token = sessionStorage.getItem("token");
    if (token) {
      headers = { Authorization: `${token}` };
    }
    try {
      const taskDetails = await fetch(
        `http://localhost:5500/todo/tasks/${id}`,
        {
          method: "GET",
          headers,
        }
      );
      const result = await taskDetails.json();
      return result;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  task: [],
  filters: {
    status: "All",
    colors: [],
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    taskAdded: (state, action) => {
      return {
        ...state,
        task: [
          ...state.task,
          {
            title: action.payload,
            isCompleted: false,
          },
        ],
      };
    },
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
    statusFilterChanged: (state, action) => {
      return {
        ...state,
        filters: {
          // copy the other filter fields
          ...state.filters,
          // And replace the status field with the new value
          status: action.payload,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecificTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecificTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.task = action.payload;
      })
      .addCase(fetchSpecificTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { taskAdded, taskToggled, statusFilterChanged } =
  taskSlice.actions;

export default taskSlice.reducer;
