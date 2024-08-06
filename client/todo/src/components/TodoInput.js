import React, { useState } from "react";

const TodoInput = () => {
  const [todo, setTodo] = useState({
    title: "",
    body: "",
  });

  const handleTodoInput = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: todo.title,
      body: todo.body,
    };

    let headers = {};
    const token = sessionStorage.getItem("token");
    if (token) {
      headers = {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      };
    }

    if (data.title === "" || data.body === "") {
      alert("Please enter a task");
    }

    const response = await fetch("http://localhost:5500/todo/tasks", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="form-container">
        <form className="add-task-form" onSubmit={handleInputSubmit}>
          <label>
            <input
              className="add-task-input"
              name="title"
              type="text"
              value={todo.title || ""}
              placeholder="Enter new task"
              onChange={handleTodoInput}
            />
          </label>

          <button className="add-submit-button" value="Add-task" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoInput;
