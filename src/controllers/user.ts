import { ICreateUser, IVerifyEmailRequest } from "@/@types/user";
import { RequestHandler } from "express";
import User from "@/models/user";
import { generateToken } from "@/utils/helper";
import { sendVerificationMail } from "@/mail/mail";
import EmailVerificationToken from "@/models/emailVerificationToken";

export const createUser: RequestHandler = async (req: ICreateUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = generateToken();

  await EmailVerificationToken.create({
    owner: user._id,
    token,
  });
  sendVerificationMail(token, {
    name,
    email,
    userId: user._id.toString(),
  });

  res.status(201).json({ user: { id: user._id, name, email } });
};

export const verifyEmail: RequestHandler = async (
  req: IVerifyEmailRequest,
  res
) => {
  const { userId, token } = req.body;

  const verificationToken = await EmailVerificationToken.findOne({
    owner: userId,
  });

  if (!verificationToken)
    return res.status(403).json({ error: "Invalid token!" });

  const matched = await verificationToken.compareToken(token);
  if (!matched) return res.status(403).json({ error: "Invalid token!" });

  await User.findByIdAndUpdate(userId, {
    verified: true,
  });
  await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

  res.json({ message: "Your email is verified." });
};
