import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes'

function App() {
  // const [count, setCount] = useState(0);
  // const [toggleValue, toggle] = useToggle(false);



  return (
    
    <div className="App">
      <AppRoutes />
    </div>
    
  )
}

export default App;
