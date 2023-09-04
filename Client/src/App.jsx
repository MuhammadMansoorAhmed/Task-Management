import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import Tasks from "./components/Pages/Tasks";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import './App.css'

function App() {
  return (
    <section className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Router>
    </section>
  );
}

export default App;
