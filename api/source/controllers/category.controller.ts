import Category from '../models/category-model';
import Task from "../models/task-model";
import { Response } from "express";
import { AuthRequest } from '../middleware';
import { ICategory } from '../types/index';


export const createCategory = async (req: AuthRequest, resp) => {

    const { name, color, icon }: ICategory = req.body;

    const userId = req.user;

    try {
        const category = await Category.create({
            name,
            user: userId,
            color,
            icon
        });
        resp.status(201).send(category);
    } catch (error) {
        console.log("error in creating cateogry", error);
        return resp.status(404).send("something went wrong");
    }

}

export const getAllCategories = async (req: AuthRequest, resp: Response) => {

    try {
        const userId = req.user;
        const categories = await Category.find({ user: userId });
        resp.status(201).send(categories);
    } catch (error) {
        console.log("error in getting all categories", error);
        resp.send({error: "something went wrong"});
        throw error;
    }

}

export const getCategoryById = async (req: AuthRequest, resp: Response) => {

    try {
        const {id} = req.params;
        const category = await Category.findById(id);
        resp.status(201).send(category);
    } catch (error) {
        console.log("error in getting category by id", error);
        resp.send({error: "something went wrong"});
        throw error;
    }

}

export const deleteCategory = async (req: AuthRequest, resp: Response) => {
    const {id} = req.params;
    try {
        await Task.deleteMany({ categoryId: id });
        await Category.deleteOne({_id: id});
        resp.status(201).send({message: "category deleted successfully"});
    } catch (error) {
        console.log("error in deleting category", error);
        resp.status(401).send({error: "error in deleting category"});
        throw error;
    }
}

export const updateCategory = async (req: AuthRequest, resp: Response) => {
    const {_id, name, isEditable, icon, color} = req.body;
    try {
        await Category.updateOne(
            {
                _id
            },
            {
                $set: {
                    name,
                    isEditable,
                    icon,
                    color
                }
            }
        );
        resp.status(202).send({message: "updated category successfully"})
    } catch (error) {
        console.log("error in updating category", error);
        resp.status(402).send({message: "error in updating category"});
        throw error;
    }
}