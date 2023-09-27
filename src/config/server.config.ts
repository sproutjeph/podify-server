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
  PASSWORD_RESET_LINK,
  JWT_SECRET,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
} = env;
