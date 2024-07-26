import express, { Request, Response, NextFunction } from "express";
import { connectToDatabase } from "./db/database";
import { PORT } from "./config/config";
import { connectToRedis } from "./db/redis";
import router from "./routes/routes";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use("/", router);

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

const startServer = async () => {
  try {
    await connectToDatabase();
    await connectToRedis();
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
