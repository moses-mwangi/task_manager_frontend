import "./styles/App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { TaskProvider } from "./hooks/useTasks";

function App() {
  return (
    <>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </TaskProvider>
    </>
  );
}

export default App;
