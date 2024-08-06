import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  let headers = {};
  const token = sessionStorage.getItem("token");
  if (token) {
    headers = { Authorization: `${token}` };
  }
  try {
    const taskDetails = await fetch("http://localhost:5500/users/user", {
      method: "GET",
      headers,
    });
    const result = await taskDetails.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("THE ERROR ====>", error);
    return error.message;
  }
});

export const deleteSpecficTask = async (id) => {
  let headers = {};
  const token = sessionStorage.getItem("token");
  if (token) {
    headers = { Authorization: `${token}` };
  }
  try {
    const deletedTask = await fetch(`http://localhost:5500/todo/tasks/${id}`, {
      method: "DELETE",
      headers,
    });
    const result = await deletedTask.json();
    console.log("This task has been deleted", result);
    return result;
  } catch (error) {
    return error.message;
  }
};

// useEffect(() => {
//   const fetchTask = async () => {
//     let headers = {};
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       headers = { Authorization: `${token}` };
//     }
//     try {
//       const taskDetails = await fetch("http://localhost:5500/todo/tasks", {
//         method: "GET",
//         headers,
//       });
//       const result = await taskDetails.json();
//       setTasks(result);
//     } catch (error) {
//       return error.message;
//     }
//   };
//   fetchTask();
// });

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

// const handleTaskDelete = async () => {
//   let headers = {};
//   const token = sessionStorage.getItem("token");
//   if (token) {
//     headers = { Authorization: `${token}` };
//   }
//   try {
//     const deletedTask = await fetch(
//       `http://localhost:5500/todo/tasks/${id}`,
//       {
//         method: "DELETE",
//         headers,
//       }
//     );
//     const result = await deletedTask.json();
//     console.log("This task has been deleted", result);
//     return result;
//   } catch (error) {
//     console.log("Error deleting task", error);
//     return error.message;
//   }
// };
