import { Request, Response, NextFunction } from "express";
import User from "../models/user-model";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user: String
}

export default async (req: AuthRequest, resp: Response, next: NextFunction) => {

    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return resp.status(401).send({message: "authorization required"});
        }

        const token = authorization;

        const { _id } = jwt.verify(token, "express");

        const existingUser = await User.findOne({ _id });

        if (!existingUser) {
            return resp.status(402).send({ message: "authorization required" });
        }
        

        req.user = existingUser.id;

        next();

    } catch (error) {
        console.log("error in middleware authorization", error);
        throw error;
    }

    

};
