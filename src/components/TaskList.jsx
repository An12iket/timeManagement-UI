import { Card, CardContent, Typography, Checkbox, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewListIcon from '@mui/icons-material/ViewList';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
import PropTypes from 'prop-types';
import CalendarView from './CalendarView';
import axios from 'axios';

const TaskList = ({ tasks, setTasks }) => {
  const [view, setView] = useState('list');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to delete tasks");
        return;
      }

      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (typeof setTasks !== 'function') {
        throw new Error('setTasks is not properly initialized');
      }
      
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred while deleting the task");
    }
  };

  return (
    <div>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        sx={{ mb: 2 }}
      >
      </ToggleButtonGroup>

      {view === 'list' ? (
        tasks.map((task) => (
          <Card key={task._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2">{task.description}</Typography>
              <Typography variant="caption">Due: {new Date(task.deadline).toLocaleString()}</Typography>
              <Checkbox checked={task.status === "completed"} />
              <IconButton onClick={() => handleDelete(task._id)}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))
      ) : (
        <CalendarView tasks={tasks} />
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default TaskList;