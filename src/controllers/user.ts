import { ICreateUser } from "@/@types/user";
import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import User from "@/models/user";
import { MAILTRAP_PASS, MAILTRAP_USER } from "@/config/server.config";
import { generateToken } from "@/utils/helper";
import EmailVerificationToken from "@/models/emailVerificationToken";

export const createUser: RequestHandler = async (req: ICreateUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = generateToken();
  const verificationToken = await EmailVerificationToken.create({
    owner: user._id,
    token,
  });

  // send verification email

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });

  transport.sendMail({
    to: user.email,
    from: "donjeph@gmail.com",
    html: `<h1>Your Verification Token is ${token}</h1>`,
  });

  res.status(201).json({ user });
};
