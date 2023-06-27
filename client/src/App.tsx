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

const ADD_TASK = gql(/* GraphQL */ `
  mutation AddTask($name: String!) {
    addTask(name: $name) {
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

const DELETE_TASK = gql(/* GraphQL */ `
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      code
      success
      message
    }
  }
`);

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { loading, data, refetch } = useQuery(GET_TASKS);
  const [toggleTaskStatus] = useMutation(TOGGLE_TASK_STATUS);
  const [addTask] = useMutation(ADD_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  useEffect(() => {
    const apiTasks = (data?.tasks || [])
    .filter((task: Task) => task != null && task != undefined)
    .map((task: Task) => ({id: task.id, name: task.name, done: task.done}));

    setTasks(apiTasks);
  }, [data]);

  const onAddTask = async (name: string) => {
    await addTask({ variables: { name }});
    refetch();
  };

  const onChangeTask = async (id: number) => {
    await toggleTaskStatus({ variables: { id } })
    refetch();
  };

  const onDeleteTask = async (id: number) => {
    await deleteTask({ variables: { id } })
    refetch();
  }
  return (
    <ThemeProvider theme={theme}>
      <AddTask onAddTask={onAddTask} />
      <h1>Task List</h1>

      {loading ? <CircularProgress /> : <TaskList tasks={tasks} onChangeTask={onChangeTask} onDeleteTask={onDeleteTask} />}
    </ThemeProvider>
  );
}

export default App;
