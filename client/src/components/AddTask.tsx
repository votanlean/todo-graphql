import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
type addTaskProps = {
  onAddTask: (name: string) => void;
}

const AddTask = ({onAddTask}: addTaskProps) => {
  const [taskName, setTaskName] = useState<string>("");
  const onClickAddTask = () => {
    onAddTask(taskName);
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