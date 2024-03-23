import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";
import axios from "axios";
import { API_URL } from "./utils";
import Home from './test_pages/home';
import About from './test_pages/about';
import PremiumPage from './test_pages/premium';


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);

      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    // <ThemeProvider theme={darkTheme}>
    //   <CssBaseline />
    //   <AddTaskForm fetchTasks={fetchTasks} />
    //   {tasks.map((task) => (
    //     <Task task={task} key={task.id} fetchTasks={fetchTasks} />
    //   ))}
    // </ThemeProvider>
    <div className="App">
      <Router>
        <div className="content">
          <NavLink className="content" to="/">Home</NavLink>
          <NavLink className="content" to="/about">About</NavLink>
          <NavLink className="content" to="/premium">Premium Content</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/premium" element={<PremiumPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
