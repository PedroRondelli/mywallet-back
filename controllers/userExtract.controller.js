import { db } from "../index.js";

export async function getUserExtract(req, res) {
  const token = req.headers.authorization.replace("Bearer ", "");
  const sessions = db.collection("sessions");
  const extracts = db.collection("extracts");
  const users = db.collection("users");
  try {
    const { userId } = await sessions.findOne({ token });
    const { name } = await users.findOne({ _id:userId });
    const extractExist = await extracts.findOne({ userId });
    if (extractExist) {
      const { arrayAccount } = extractExist;
      res.status(200).send({ name,arrayAccount });
      return;
    }
    res.status(200).send({name,arrayAccount:[]});
  } catch (erro) {
    console.log(erro);
  }
}
