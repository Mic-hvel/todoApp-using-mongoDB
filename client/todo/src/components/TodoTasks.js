import React, { useEffect, useState } from "react";

const TodoTasks = () => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "http://localhost:5500/todo/tasks/6601eb98374f598c81c627e8",
        {
          method: "GET",
          headers: new Headers({
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDAyMDA2MzAzZDhkYzg5NWU1OTgwNyIsImlhdCI6MTcxMTU3MTE1M30.FZ8FPR5iPco_FqWCQgYQeT2XzF1kvmAQLb4_df6zdL4 ",
            "Content-Type": "application/x-www-form-urlencoded",
          }),
        }
      );
      const data = await result.json();
      return setTasks(data);
    };

    fetchData();
  }, []);

  if (!tasks) return null;

  const handleSearch = (e) => {
    setTasks(e.target.value);
  };

  console.log(tasks);
  return (
    <div>
      <div className="tasks-container">
        <div className="tasks-heading-container">
          <h3 className="tasklist-heading">Search</h3>
          <span className="divider"></span>
          <label>
            <input
              name="filter"
              className="filter-tasks"
              placeholder="type to filter"
              type="text"
              onChange={handleSearch}
            />
          </label>
        </div>
        <ul>
          {Object.values(tasks).map((task) => {
            return <li key={task.id}>{task.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoTasks;
