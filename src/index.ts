import { connectDb } from "./DB/connectDB";
import http from "http";
import app from "./app";
import { PORT } from "./config/server.config";

const server = http.createServer(app);

async function startServer() {
  await connectDb();
  console.log("Connected to DB");

  server.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });
}

startServer();
