import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import joi from "joi";

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

const db = mongoClient.db("myWallet");

const registerSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().min(3).required(),
  password: joi.string().required(),
});

app.post("/signUp", async (req, res) => {
  const validation = registerSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res
      .status(400)
      .send(validation.error.details.map((detail) => detail.message));
  }
  const { email, name, password } = req.body;

  const register = { ...req.body, password: bcrypt.hashSync(password, 10) };

  try {
    const registerExist = await db.collection("users").findOne({ name, email });
    if (!registerExist) {
      await db.collection("users").insertOne(register);
      return res.sendStatus(201);
    }
    res.status(409).send("User already exists");
  } catch (erro) {
    console.log(erro);
  }
});

app.listen(5000, () => console.log("running in port 5000"));
