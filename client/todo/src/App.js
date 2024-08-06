import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import SignIn from "./pages/SignIn";
import Home from "./components/Home";
import Task from "./pages/Task";
import TaskList from "./components/TaskLists";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignIn />} path="/login" />
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
          <Route exact element={<Task />} path="/tasks/:id" />
          <Route element={<TaskList />} path="/tasks"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
