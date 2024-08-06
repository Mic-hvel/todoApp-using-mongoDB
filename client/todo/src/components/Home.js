import React, { useState, useEffect } from "react";
import ClearTasks from "./ClearTasks";
import TodoInput from "./TodoInput";
import TodoTasks from "./TodoTasks";

const Home = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchName = async () => {
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
        setUserName(result.username);
      } catch (error) {
        return error.message;
      }
    };
    fetchName();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <h1 className="main-heading">Todo App</h1>
          <h2>Welcome, {userName}</h2>
          <TodoInput />
          <hr />
          <TodoTasks />
          <hr />
          <ClearTasks />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Home;
