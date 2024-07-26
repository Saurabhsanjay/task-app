import express from "express";
import { connectToDatabase } from "./db/database.js";
import { PORT } from "./config/config.js";
import { connectToRedis } from "./db/redis.js";
import router from "./routes/routes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.use("/", router);
// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});
const startServer = async () => {
    try {
        await connectToDatabase();
        await connectToRedis();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};
startServer();
