import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTodoTask } from "../redux/user/todoSlice";
import TaskList from "./TaskLists";
import Search from "./Search";

const TodoTasks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoTask());
  }, [dispatch]);

  return (
    <div>
      <div className="tasks-container">
        <div className="tasks-heading-container">
          <h3 className="tasklist-heading">Tasks</h3>
          <span className="divider"></span>
          <Search />
        </div>
        <TaskList />
      </div>
    </div>
  );
};

export default TodoTasks;
