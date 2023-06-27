import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import { Task } from "./types/Task";
import { useMutation, useQuery, gql } from "@apollo/client";

const theme = createTheme({
  palette: {
    background: {
      default: "#fff",
    },
    text: {
      primary: "#000",
    },
    primary: {
      main: "#00539C",
    },
    secondary: {
      main: "#EEA47F",
    },
  },
});

const GET_TASKS = gql(/* GraphQL */ `
  query GetTasks {
    tasks {
      id
      name
      done
    }
  }
`);

const TOGGLE_TASK_STATUS = gql(/* GraphQL */ `
  mutation ToggleTaskStatus($id: ID!) {
    toggleTaskStatus(id: $id) {
      code
      success
      message
      task {
        id
        name
        done
      }
    }
  }
`);

function App() {
  const { loading, data } = useQuery(GET_TASKS);
  const [toggleTaskStatus] = useMutation(TOGGLE_TASK_STATUS);

  const apiTasks = (data?.tasks || [])
    .filter((task: Task) => task != null && task != undefined)
    .map((task: Task) => ({id: task.id, name: task.name, done: task.done}));

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(apiTasks);
  }, [apiTasks]);

  const onAddTask = (task: Task) => {
    const newTasks = [...tasks];
    newTasks.push(task);
    setTasks(newTasks);
  };
  const onChangeTask = async (id: number) => {
    const {data} = await toggleTaskStatus({ variables: { id } })
    const task = data.toggleTaskStatus.task;
    const editedTask = [...(tasks.filter((item) => item.id !== task.id)), task];
    setTasks(editedTask);
  };
  return (
    <ThemeProvider theme={theme}>
      <AddTask onAddTask={onAddTask} />
      <h1>Task List</h1>

      {loading ? <CircularProgress /> : <TaskList tasks={tasks} onChangeTask={onChangeTask} />}
    </ThemeProvider>
  );
}

export default App;
