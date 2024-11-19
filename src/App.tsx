import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "./components/LoadingBar";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  // const [count, setCount] = useState(0);
  // const [toggleValue, toggle] = useToggle(false);

  return (
    <div className="App">
      <LoadingBar />
      <AppRoutes /> 
      <ToastContainer toastStyle={{ zIndex: 10001 }} />
    </div>
  );
}

export default App;
