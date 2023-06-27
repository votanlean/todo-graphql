import { Task } from "../types/Task";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type taskListProps = {
  tasks: Task[];
  onChangeTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
};

const TaskList = ({tasks, onChangeTask, onDeleteTask}: taskListProps) => {
  return (<List>
    {tasks.map((task) => {
      return (
        <ListItem key={task.id}>
          <ListItemIcon onClick={() => onChangeTask(task.id)}>
            <Checkbox checked={task.done}/>
          </ListItemIcon>
          <ListItemText primary={task.name} sx={task.done ? {textDecoration: 'line-through'} : {}}/>
          <ListItemIcon onClick={() => onDeleteTask(task.id)} sx={{ "&:hover": {color: "red", cursor: "pointer"}}}>
            <DeleteIcon />
          </ListItemIcon>
        </ListItem>
      );
    })}
  </List>)
};

export default TaskList;
