import redisClient from "../db/redis";
import Task from "../models/Tasks";

const TASK_KEY = `FULLSTACK_TASK_ruchi`;

export const addItemToCache = async (newItem: string) => {
  const cachedItems = await redisClient.get(TASK_KEY);
  let items = cachedItems ? JSON.parse(cachedItems) : [];

  items.push(newItem);

  if (items.length > 50) {
    await Task.create({ items });
    await redisClient.del(TASK_KEY);
  } else {
    await redisClient.set(TASK_KEY, JSON.stringify(items));
  }
};

export const getAllItems = async () => {
  const cachedItems = await redisClient.get(TASK_KEY);
  let items = cachedItems ? JSON.parse(cachedItems) : [];

  const tasksFromDb = await Task.find();
  tasksFromDb.forEach((task) => {
    items.push(...task.items);
  });

  return items;
};
