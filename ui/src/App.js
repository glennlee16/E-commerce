import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";

// Import components
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";
import { API_URL } from "./utils";

// Create a light theme
const lightTheme = createTheme({ palette: {mode: "light",}, });

// Main App component
export default function App() {
  // State to store the tasks
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetching tasks on component mount
  useEffect(() => {fetchTasks();}, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => (
        <Task task={task} key={task.id} fetchTasks={fetchTasks} />
      ))}
    </ThemeProvider>
  );
}
