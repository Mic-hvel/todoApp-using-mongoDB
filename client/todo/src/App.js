import "./App.css";
import ClearTasks from "./components/ClearTasks";
import TodoInput from "./components/TodoInput";
import TodoTasks from "./components/TodoTasks";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <h1 className="main-heading">Todo App</h1>
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
}

export default App;
