import { ICreateUser } from "@/@types/user";
import { RequestHandler } from "express";
import User from "@/models/user";

export const createUser: RequestHandler = async (req: ICreateUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({ user });
};
