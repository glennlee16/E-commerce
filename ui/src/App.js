import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";    // http requests

// own components
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";
import { API_URL } from "./utils";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() 
{
  // populates tasks as an empty array, later populated with task data fetched from the server
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      // http command
      const { data } = await axios.get(API_URL);

      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  // useeffect is a loop
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => (
        <Task task={task} key={task.id} fetchTasks={fetchTasks} />
      ))}
    </ThemeProvider>
  );
}
