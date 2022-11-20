import bcrypt from "bcrypt";
import { db } from "../index.js";

export async function registerUser(req, res) {
  const { email, name, password } = req.body;

  const register = { ...req.body, password: bcrypt.hashSync(password, 10) };
  const usersCollection = db.collection("users");

  try {
    const registerExist = await usersCollection.findOne({ email });
    if (!registerExist) {
      await usersCollection.insertOne(register);
      return res.sendStatus(201);
    }
    res.status(409).send("User already exists");
  } catch (erro) {
    console.log(erro);
  }
}
