const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const tasksFilePath = path.join(__dirname, "tasks.json");

// Helper to read tasks
const readTask = () => {
  if (!fs.existsSync(tasksFilePath)) return [];
  return JSON.parse(fs.readFileSync(tasksFilePath, "utf-8") || "[]");
};

// Helper to write tasks
const writeTasks = (tasks) =>
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

// List all tasks
app.get("/tasks", (req, res) => {
  const tasks = readTask();
  res.json(tasks);
});

// Add a task
app.post("/tasks", (req, res) => {
  const tasks = readTask();
  const newTask = {
    id: tasks.length + 1,
    task: req.body.task,
    completed: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const updatedTasks = tasks.filter(
    (task) => task.id !== parseInt(req.params.id, 10)
  );
  writeTasks(updatedTasks);
  res.status(200).json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Task Manager API is running on http://localhost:${PORT}`);
});
