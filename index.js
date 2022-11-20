import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { registerUser } from "./controllers/signup.controller.js";
import { validateRegister } from "./middlewares/register.middleware.js";
import { validateLogin } from "./middlewares/login.middleware.js";
import { logIn } from "./controllers/login.controller.js";

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

app.post("/signUp", validateRegister, registerUser);

app.post("/signIn",validateLogin,logIn)

app.listen(5000, () => console.log("running in port 5000"));
