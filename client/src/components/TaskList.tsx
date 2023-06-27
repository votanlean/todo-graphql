import { Task } from "../types/Task";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type taskListProps = {
  tasks: Task[];
  onChangeTask: (id: number) => void;
};

const TaskList = ({tasks, onChangeTask}: taskListProps) => {
  return (<List>
    {tasks.map((task) => {
      return (
        <ListItem key={task.id}>
          <ListItemIcon onClick={() => onChangeTask(task.id)}>
            <Checkbox checked={task.done}/>
          </ListItemIcon>
          <ListItemText primary={task.name} sx={task.done ? {textDecoration: 'line-through'} : {}}/>
        </ListItem>
      );
    })}
  </List>)
};

export default TaskList;
