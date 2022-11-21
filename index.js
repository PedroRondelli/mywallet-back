import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routers/user.router.js";
import extractRouter from "./routers/extract.router.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
} catch (erro) {
  console.log(erro);
}

app.use(userRouter);
app.use(extractRouter);

export const db = mongoClient.db("myWallet");

app.listen(5000, () => console.log("running in port 5000"));
