import express from "express";
import { addTask, fetchAllTasks } from "../controllers/taskController";

const router = express.Router();

router.post("/add", addTask);
router.get("/fetchAllTasks", fetchAllTasks);

export default router;
