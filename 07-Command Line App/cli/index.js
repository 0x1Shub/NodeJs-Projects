#!/usr/bin/env node

const inquirer = require("inquirer").default;
const axios = require("axios");

const API_URL = "http://localhost:3000/tasks";

const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Choose an action:",
    choices: ["List Tasks", "Add Task", "Delete Task", "Exit"],
  });

  switch (action) {
    case "List Tasks":
      await listTasks();
      break;
    case "Add Task":
      await addTask();
      break;
    case "Delete Task":
      await deleteTask();
      break;
    case "Exit":
      process.exit();
  }
};

const listTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("\nTasks:");
    response.data.forEach(({ id, task, completed }) => {
      console.log(`${id}. ${task} [${completed ? "Done" : "Pending"}]`);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
  }
  mainMenu();
};

const addTask = async () => {
  const { task } = await inquirer.prompt({
    type: "input",
    name: "task",
    message: "Enter task description:",
  });
  try {
    await axios.post(API_URL, { task });
    console.log("Task added successfully!");
  } catch (error) {
    console.error("Error adding task:", error.message);
  }
  mainMenu();
};

const deleteTask = async () => {
  const { id } = await inquirer.prompt({
    type: "input",
    name: "id",
    message: "Enter the task ID to delete:",
  });
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log("Task deleted successfully!");
  } catch (error) {
    console.error("Error deleting task:", error.message);
  }
  mainMenu();
};

mainMenu();
