import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <h1 className="main-heading">Todo App</h1>
          <div className="form-container">
            <form className="add-task-form">
              <label for="add-task-input">
                <input
                  className="add-task-input"
                  name="add-task-input"
                  type="text"
                  placeholder="Enter new task"
                />
              </label>
              <input
                className="add-submit-button"
                value="Add-task"
                type="submit"
              />
            </form>
          </div>
          <hr />
          <div className="tasks-container">
            <div className="tasks-heading-container">
              <h3 className="tasklist-heading">Search</h3>
              <span className="divider"></span>
              <label for="filter">
                <input
                  name="filter"
                  className="filter-tasks"
                  placeholder="type to filter"
                  type="text"
                />
              </label>
            </div>
            <ul className="task-list"></ul>
          </div>
          <hr />
          <div className="clear-btn">
            <button className="clear-all-button">Clear Tasks</button>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default App;
