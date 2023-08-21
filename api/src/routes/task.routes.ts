import express from "express";
import { createTask, getAllTasks, getAllTasksByCategory, getAllCompletedTasks, toggleTaskStatus, getTasksForToday, editTask, deleteTask } from "../controllers/task.controller";
import requireAuth from "../middleware";

const taskRoutes = express.Router();

taskRoutes.use(requireAuth);

taskRoutes.post("/create", createTask);

taskRoutes.get("/", getAllTasks);

taskRoutes.get("/tasks-by-categories/:id", getAllTasksByCategory);

taskRoutes.get("/completed", getAllCompletedTasks);

taskRoutes.put("/update/:id", toggleTaskStatus);

taskRoutes.get("/today", getTasksForToday);

taskRoutes.put("/edit/:id", editTask);

taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
