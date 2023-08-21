import { Request, Response } from 'express';
import User from '../models/user-model';
import { IUser } from '../types/';
import bcrypt from 'bcrypt';
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

const getAuthToken = async (_id: string | Types.ObjectId) => {
    const token = await jwt.sign({_id}, "express", {
        expiresIn: "7d"
    });
    return token;
}

export const createUser = async (request: Request, response: Response) => {
    

    const {name, email, password}: IUser = request.body;

    const existingUser: IUser = await User.findOne({ email });

    if (existingUser) {
        return response.status(409).send("user already exists");
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );

        response.status(201).send({message: "user created successfully"});

    } catch (error) {
        console.log("error in creating user", error);
        throw error;
    }

}

export const loginUser = async (req: Request, resp: Response) => {

    try {
        const { email, password }: IUser = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return resp.status(401).send({ message: "user doesn't exist" });
        }

        const isPasswordIdentical = await bcrypt.compare(password, existingUser.password);

        if (isPasswordIdentical) {
            const token = await getAuthToken(existingUser._id);
            return resp.status(200).send({
                token,
                user: {
                    name: existingUser.name,
                    email: existingUser.email
                }
            });
        }
    } catch (error) {
        console.log("error in logging in", error);
        throw error;
    }

    




}