import express, { Request, Response } from 'express';
import cors from 'cors';
import connectToDatabase from './db';
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
import requireAuth from "./middleware/index";

const application = express();

const PORT = 1337;

application.use(express.json());

application.use(cors());

connectToDatabase();

application.get('/ping', (req: Request, response: Response) => {
    response.send("pong");
});

application.get('/tic', requireAuth, (req: Request, response: Response) => {
    response.send("tac");
});

application.use("/users", userRoutes);

application.use("/categories", categoryRoutes);

application.use("/tasks", taskRoutes);

application.listen(PORT, () => {
    console.log("server is up and running!");
});