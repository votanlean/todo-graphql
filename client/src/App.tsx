import {
  Alert,
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import "./App.css";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import { AlertMessage, Task } from "./types/Task";
import { useMutation, useQuery } from "@apollo/client";
import {gql} from "./__generated__/gql";
import CloseIcon from "@mui/icons-material/Close";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

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

const GET_RANDOM_QUOTE = gql(/* GraphQL */ `
  query GetRandomQuote {
    getRandomQuote {
      id
      content
      author
      tags
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
  const [quote, setQuote] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({
    message: "",
    severity: "",
    open: false,
  });
  const { loading, data, refetch } = useQuery(GET_TASKS);
  const { loading: loadingQuote, data: dataQuote } = useQuery(GET_RANDOM_QUOTE);
  const [toggleTaskStatus] = useMutation(TOGGLE_TASK_STATUS);
  const [addTask] = useMutation(ADD_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  useEffect(() => {
    const tasks: Task[] = (data?.tasks || [])
      .filter((task) => task != null && task != undefined)
      .map((task) => ({ id: parseInt(task.id), name: task.name, done: task.done }));
    setTasks(tasks);
  }, [data]);

  useEffect(() => {
    const quote = (dataQuote?.getRandomQuote?.content || "");
    setQuote(quote);
  }, [dataQuote]);

  const onAddTask = async (name: string) => {
    await addTask({ variables: { name } });
    setAlertMessage({ message: "Task added", severity: "success", open: true });
    setTimeout(() => {
      console.log("time out");
      setAlertMessage({ message: "", severity: "", open: false });
    }, 1000);
    refetch();
  };

  const onChangeTask = async (id: number) => {
    await toggleTaskStatus({ variables: { id } });
    setAlertMessage({
      message: "Task status changed",
      severity: "success",
      open: true,
    });
    setTimeout(() => {
      console.log("time out");
      setAlertMessage({ message: "", severity: "", open: false });
    }, 1000);
    refetch();
  };

  const onDeleteTask = async (id: number) => {
    await deleteTask({ variables: { id } });
    setAlertMessage({
      message: "Task deleted",
      severity: "success",
      open: true,
    });
    setTimeout(() => {
      console.log("time out");
      setAlertMessage({ message: "", severity: "", open: false });
    }, 1000);
    refetch();
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "1rem", marginBottom: "1rem" }}>
        {loadingQuote ? (
          <CircularProgress />
        ) : (
          <Typography variant="body1">
            <FormatQuoteIcon />
            <i>{quote}</i>
            <FormatQuoteIcon />
          </Typography>
        )}
      </Box>
      <AddTask onAddTask={onAddTask} />

      <h1>Task List</h1>

      {loading ? (
        <CircularProgress />
      ) : (
        <TaskList
          tasks={tasks}
          onChangeTask={onChangeTask}
          onDeleteTask={onDeleteTask}
        />
      )}
      <Box sx={{ width: "100%" }}>
        {alertMessage.open && (
          <Collapse in={alertMessage.open}>
            <Alert
              severity={
                alertMessage.severity == "success" ? "success" : "error"
              }
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertMessage({ message: "", severity: "", open: false });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alertMessage.message}
            </Alert>
          </Collapse>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
