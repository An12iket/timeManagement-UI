import { useState, useEffect } from "react";
import { Container, Fab, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import CalendarView from "../components/CalenderView";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [view, setView] = useState("list"); // 'list' or 'calendar'

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", newTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks([...tasks, response.data]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(e, newView) => newView && setView(newView)}
          >
            <ToggleButton value="list">List View</ToggleButton>
            <ToggleButton value="calendar">Calendar View</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {view === "list" ? (
          <TaskList tasks={tasks} />
        ) : (
          <CalendarView tasks={tasks} />
        )}

        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setIsFormOpen(true)}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <AddIcon />
        </Fab>
        {isFormOpen && (
          <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", p: 4, boxShadow: 24 }}>
            <TaskForm onSubmit={handleAddTask} onClose={() => setIsFormOpen(false)} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Dashboard;