import dotenv from "dotenv";
dotenv.config();

const { env } = process as { env: { [key: string]: string } };

export const {
  PORT,
  MONGODB_URI,
  MAILTRAP_USER,
  MAILTRAP_PASS,
  VERIFICATION_EMAIL,
  SIGN_IN_URL,
} = env;
