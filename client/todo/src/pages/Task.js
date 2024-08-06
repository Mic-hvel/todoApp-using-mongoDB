import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpecificTask } from "../redux/user/taskSlice";

const Task = () => {
  const task = useSelector((state) => state.task.task);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSpecificTask(id));
  }, [dispatch, id]);

  if (!task) return null;

  return (
    <div>
      <div>
        <h1>Todo List</h1>
      </div>
      <div>{task.body}</div>
    </div>
  );
};

export default Task;
