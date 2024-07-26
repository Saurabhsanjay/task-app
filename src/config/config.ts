import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || "";
export const COLLECTION_NAME = process.env.COLLECTION_NAME || "";
export const REDIS_HOST = process.env.REDIS_HOST || "";
export const REDIS_PORT = process.env.REDIS_PORT || "";
export const REDIS_USERNAME = process.env.REDIS_USERNAME || "";
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";
