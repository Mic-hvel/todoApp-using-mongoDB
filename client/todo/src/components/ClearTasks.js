import React from "react";

const ClearTasks = () => {
  const handleDelete = () => {};

  return (
    <div>
      <div className="clear-btn">
        <button className="clear-all-button" onClick={handleDelete}>
          Clear Tasks
        </button>
      </div>
    </div>
  );
};

export default ClearTasks;
