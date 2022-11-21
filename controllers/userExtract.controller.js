import { db } from "../index.js";

async function getUserExtract(req, res) {
  const token = req.headers.authorization.replace("Bearer ", "");
  const sessions = db.collection("sessions");
  const extracts = db.collection("extracts");
  try {
    const { userId } = await sessions.findOne({ token });
    const extractExist = await extracts.findOne({ userId });
    if (extractExist) {
      const { arrayAccount } = extractExist;
      res.status(200).send(arrayAccount);
      return;
    }
  } catch (erro) {
    console.log(erro);
  }
}