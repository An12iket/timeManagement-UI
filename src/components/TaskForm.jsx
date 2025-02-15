import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const TaskForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [deadline, setDeadline] = useState(initialData?.deadline || "");
  const [category, setCategory] = useState(initialData?.category || "");

  const categories = ["Work", "Personal", "Shopping"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!title.trim()) return alert("Please enter a title");
    if (!deadline) return alert("Please select a deadline");
    if (!category) return alert("Please select a category");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to create tasks");
        return;
      }

      // Ensure deadline is formatted correctly
      const formattedDeadline = new Date(deadline).toISOString();

      const taskData = {
        title: title.trim(),
        description: description.trim(),
        deadline: formattedDeadline,
        category,
      };

      console.log("Submitting Task Data:", taskData); // Debugging

      let response;
      if (initialData?._id) {
        // Update existing task
        response = await axios.put(
          `https://timemanagement-api.onrender.com//api/tasks/${initialData._id}`,
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Create new task
        response = await axios.post("https://timemanagement-api.onrender.com//api/tasks", taskData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      onSubmit(response.data);

      if (!initialData) {
        // Reset form only for new tasks
        setTitle("");
        setDescription("");
        setDeadline("");
        setCategory("");
      }
    } catch (error) {
      console.error("Error saving task:", error);

      if (error.response?.status === 401) {
        alert("Please login to manage tasks");
      } else if (error.response?.status === 500) {
        alert(`Server error: ${error.response?.data?.error || "Unknown error"}`);
      } else {
        alert("An error occurred while saving the task. Please try again.");
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
      />
      <TextField
        label="Deadline"
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default TaskForm;
