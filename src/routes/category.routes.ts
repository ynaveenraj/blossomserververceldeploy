import express from "express";
import requireAuth from "../middleware/";
import { createCategory, getAllCategories, getCategoryById, deleteCategory, updateCategory } from "../controllers/category.controller";

const categoryRoutes = express.Router();

categoryRoutes.use(requireAuth);


categoryRoutes.route("/").get(getAllCategories);

categoryRoutes.route("/:id").get(getCategoryById);
categoryRoutes.route("/create").post(createCategory);

categoryRoutes.route("/:id").delete(deleteCategory);

categoryRoutes.route("/update").put(updateCategory);

export default categoryRoutes;
