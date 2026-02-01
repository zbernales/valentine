import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Connections from "./Connections";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* First page */}
        <Route path="/" element={<Connections />} />
      </Routes>
    </Router>
  );
}

export default App
