import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URL } from "../utils";

// Component to update a task
export const UpdateTaskForm = ({ fetchTasks, isDialogOpen, setIsDialogOpen, task, }) => {
  const { id, completed } = task;

  // State to manage the updated task name
  const [taskName, setTaskName] = useState("");

  // Function to update the task name
  const handleUpdateTaskName = async () => {
    try {
      await axios.put(API_URL, { id, name: taskName, completed,});
      await fetchTasks();
      setTaskName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit Task</DialogTitle>
      <div className="dialog">
        <TextField size="small" label="Task" variant="outlined" onChange={(e) => setTaskName(e.target.value)} />
        <Button
          variant="contained"
          onClick={async () => {
            await handleUpdateTaskName();   
            setIsDialogOpen(false);
          }}>
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};
