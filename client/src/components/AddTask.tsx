import { Button, FormControl, TextField } from "@mui/material";
import { Task } from "../types/Task";
import { useState } from "react";
type addTaskProps = {
  onAddTask: (task: Task) => void;
}

const AddTask = ({onAddTask}: addTaskProps) => {
  const [taskName, setTaskName] = useState<string>("");
  const onClickAddTask = () => {
    onAddTask({name: taskName, done: false});
    setTaskName("");
  }
  return (
    <form action="">
      <FormControl>
      <TextField type="text" color="primary" label="Task Name" value={taskName} onChange={(event) => setTaskName(event.target.value)} />
      <Button variant="contained" color="secondary" onClick={onClickAddTask}>Add Task</Button>
    </FormControl>
    </form>
  ) 
}

export default AddTask;