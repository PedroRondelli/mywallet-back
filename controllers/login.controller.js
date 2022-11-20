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
      return res.sendStatus(401);
    }
    const passwordIsCorrect = bcrypt.compareSync(
      password,
      userRegistered.password
    );
    if (passwordIsCorrect) {
      const token = uuid();

      await sessions.insertOne({ userId: userRegistered._id, token: token });
      return res.status(200).send(token);
    }

    res.sendStatus(401);
  } catch (erro) {
    console.log(erro);
  }
}
