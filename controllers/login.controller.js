import bcrypt from "bcrypt";
import { db } from "../index.js";
import { v4 as uuid } from "uuid";

export async function logIn(req, res) {
  const { email, password } = req.body;
  const usersCollection = db.collection("users");
  const sessions = db.collection("sessions");
  try {
    const userRegistered = await usersCollection.findOne({ email });

    if (!userRegistered) {
      return res.status(401).send("not registered");
    }

    const token = uuid();

    await sessions.insertOne({ userId: userRegistered._id, token: token });
    res.status(200).send(token);
  } catch (erro) {
    console.log(erro);
  }
}
