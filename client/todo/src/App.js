import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import SignIn from "./pages/SignIn";
import Home from "./components/Home";
import Task from "./pages/Task";
import TaskList from "./components/TaskLists";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignIn />} path="/" />
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/home" />
          <Route element={<TaskList />} path="/tasks" />
          <Route element={<Task />} path="/home/tasks/:id" />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
