import { AuthRequest } from "../middleware/index";
import { Response } from "express";
import Task from "../models/task-model";
import { ITask } from "../types/index";

export const createTask = async (req: AuthRequest, resp: Response) => {
    const userId = req.user;
    const {categoryId, name, date}:ITask = req.body;
    try {
        const task = await Task.create(
            {
                user: userId,
                categoryId,
                name,
                date
            }
        );
        resp.status(202).send(task);
    } catch (error) {
        console.log("error in creating task", error);
        resp.status(402).send({error: "error in creating task"});
        throw error;
    }
}

export const getAllTasks = async (req: AuthRequest, resp: Response) => {
    try {
        const userId = req.user;
        const tasks = await Task.find({ user: userId });
        resp.status(203).send(tasks);
    } catch (error) {
        console.log("error in getting all tasks", error);
        resp.status(402).send({error: "error in getting all tasks"});
        throw error;
    }
}

export const getAllTasksByCategory = async (req: AuthRequest, resp: Response) => {
    try {
        const userId = req.user;
        const {id} = req.params;
        const tasks = await Task.find({
            user: userId,
            categoryId: id
        });
        resp.status(202).send(tasks);
    } catch (error) {
        console.log("error in getting all tasks by category", error);
        resp.status(402).send({ error: "error in getting all tasks by category" });
        throw error;
    }
}

export const getAllCompletedTasks = async (req: AuthRequest, resp: Response) => {
    try {
        const userId = req.user;
        const tasks = await Task.find({
            user: userId,
            isCompleted: true
        });
        resp.status(202).send(tasks);
    } catch (error) {
        console.log("error in getting completed tasks", error);
        resp.status(402).send({ error: "error in getting completed tasks" });
        throw error;
    }
}

export const toggleTaskStatus = async (req: AuthRequest, resp: Response) => {
    const {isCompleted} = req.body;
    const {id} = req.params;
    try {
        await Task.updateOne(
            {
                _id: id
            },
            {
                isCompleted
            }
        );
        resp.status(202).send({message: "task status updated successfully"});
    } catch (error) {
        console.log("error in updating task status", error);
        resp.status(402).send({error: "error in updating task status"});
        throw error;
    }
}

export const getTasksForToday = async (req: AuthRequest, resp: Response) => {
    try {
        const userId = req.user;
        const todayDate = new Date();
        todayDate.setHours(0,0,0,0);
        const tasks = await Task.find({
            user: userId,
            date: todayDate.toISOString()
        });
        resp.status(202).send(tasks);
    } catch (error) {
        console.log("error in getting completed tasks", error);
        resp.status(402).send({ error: "error in getting completed tasks" });
        throw error;
    }
}

export const editTask = async (req: AuthRequest, resp: Response) => {
    try {const { _id, categoryId, name, date}: ITask = req.body;
        await Task.updateOne(
            {
                _id
            },
            {
                $set: {
                    categoryId,
                    name,
                    date
                }
            }
        );
        resp.status(202).send({message: "task updated successfully"});
    } catch (error) {
        console.log("error in uppdating task", error);
        resp.status(402).send({ error: "error in updating task" });
        throw error;
    }
}

export const deleteTask = async (req: AuthRequest, resp: Response) => {
    try {
        const {id} = req.params;
        await Task.deleteOne(
            {
                _id: id
            }
        );
        resp.status(203).send({ message: "task deleted successfully" });
    } catch (error) {
        console.log("error in deleting task", error);
        resp.status(402).send({ error: "error in deleting task" });
        throw error;
    }
}