import { Button, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

// Component to display a single task
export const Task = ({ task, fetchTasks }) => {
  const { id, name, completed } = task;

  // State for managing task completion
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to update the completion status of the task
  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, { id, name, completed: !isComplete, });
      setIsComplete((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to delete the task
  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);
      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="task">
      <div className={classnames("flex", { done: isComplete, })}>
        <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm fetchTasks={fetchTasks} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} task={task}/>
    </div>
  );
};
