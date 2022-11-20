import { db } from "../index.js";

export async function updateExpenses(req, res) {
  const bonusOrBurden = req.body;
  const token = req.headers.authorization.replace("Bearer ", "");
  const sessions = db.collection("sessions");
  const extracts = db.collection("extracts");

  try {
    const sessionExist = await sessions.findOne({ token });

    if (sessionExist) {
      const { userId } = sessionExist;
      const accountExist = await extracts.findOne({ userId });
      console.log(accountExist);
      if (accountExist) {
        console.log("já tem po");
        return res.sendStatus(200);
      }
      const arrayAccount = [bonusOrBurden];
      const objetoDeInsersao = { userId, arrayAccount };
      await extracts.insertOne(objetoDeInsersao);
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  } catch (erro) {
    console.log(erro);
  }
}
