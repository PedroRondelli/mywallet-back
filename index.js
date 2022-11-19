import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { registerUser } from "./controllers/signup.controller.js";
// import bcrypt from "bcrypt";
// import joi from "joi";

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

export const db = mongoClient.db("myWallet");

app.post("/signUp", registerUser);

app.listen(5000, () => console.log("running in port 5000"));
