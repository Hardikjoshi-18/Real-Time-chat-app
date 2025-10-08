import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import {createClient} from "redis"
import userRoutes from "./routes/user.js"

dotenv.config();
connectDb();

export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient
  .connect()
  .then(() => console.log("connected to redis"))
  .catch(console.error);

const app = express();

app.use("api/v1", userRoutes)

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
