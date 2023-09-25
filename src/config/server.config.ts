import dotenv from "dotenv";
dotenv.config();

const { env } = process as { env: { [key: string]: string } };

export const PORT = env.PORT || 8000;

export const MONGODB_URI = env.MONGODB_URI;
