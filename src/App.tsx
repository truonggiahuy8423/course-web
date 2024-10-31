import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "./components/LoadingBar";

function App() {
  // const [count, setCount] = useState(0);
  // const [toggleValue, toggle] = useToggle(false);

  return (
    <div className="App">
      <LoadingBar />
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
