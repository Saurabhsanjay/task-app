import { Request, Response } from "express";
import { addItemToCache, getAllItems } from "../services/taskService";

export const addTask = async (req: Request, res: Response) => {
  try {
    const newItem = req.body.item;
    if (!newItem) {
      return res.status(400).send("Item is required");
    }

    await addItemToCache(newItem);
    res.status(200).send("Item added successfully");
  } catch (error) {
    console.log(error)
    res.status(500).send({error,msg:"Error adding item"});
  }
};

export const fetchAllTasks = async (_req: Request, res: Response) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send("Error fetching tasks");
  }
};
