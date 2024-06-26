import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import { API_URL } from "../utils";

// Create a custom theme for the title typography
const titleTheme = createTheme({ typography: { fontFamily: 'Verdana', }, });

// Component to add a new task
export const AddTaskForm = ({ fetchTasks }) => {
  // State to store the new task name
  const [newTask, setNewTask] = useState("");

  // Function to add a new task
  const addNewTask = async () => {
    try {
      await axios.post(API_URL, { name: newTask, completed: false, });
      await fetchTasks();
      setNewTask("");
    } 
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2} theme={titleTheme}>
        <b>Magkoli Task List</b>
      </Typography>
      <div className="addTaskForm">
        <TextField size="small" label="Task" variant="outlined" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
        <Button disabled={!newTask.length} variant="outlined" onClick={addNewTask}>
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};
