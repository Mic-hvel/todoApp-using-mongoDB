import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

import { useDispatch } from "react-redux";
import { todoToggled } from "../redux/user/todoSlice";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchName = async () => {
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
        setTasks(result);
      } catch (error) {
        return error.message;
      }
    };
    fetchName();
  }, []);

  return (
    <div className="tasks">
      <ul className="task-list">
        {Object.values(tasks).map((task) => {
          return (
            <li
              className="task-item"
              key={task.id}
              style={{
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
            >
              <input
                className="ticker"
                type="checkbox"
                // checked={task.isCompleted}
                onChange={() => dispatch(todoToggled(task.id))}
              />
              <Link to={`tasks/${task.id}`}>{task.title}</Link>
              <AiFillEdit className="edit-icon" />
              <MdDeleteForever className="clear-icon" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
