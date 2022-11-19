import bcrypt from "bcrypt";
import { db } from "../index.js";

export async function registerUser(req, res) {
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
}
