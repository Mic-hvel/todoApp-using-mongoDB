import React, { useState } from "react";

const TodoInput = () => {
  const [todo, setTodo] = useState("");

  const handleTodoInput = (e) => {
    setTodo(e.target.value);
  };

  const handleInputSubmit = async () => {
    if (todo === "") {
      alert("Please enter a task");
    }

    const response = await fetch("", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ todo }),
    });
    const result = response.json();
    setTodo(result);
  };

  return (
    <div>
      <div className="form-container">
        <form className="add-task-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            <input
              className="add-task-input"
              name="add-task-input"
              value={todo}
              type="text"
              placeholder="Enter new task"
              onChange={handleTodoInput}
            />
          </label>
          <input
            className="add-submit-button"
            value="Add-task"
            type="submit"
            onClick={handleInputSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default TodoInput;
