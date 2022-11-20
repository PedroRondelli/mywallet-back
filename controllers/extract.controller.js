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
        const { arrayAccount } = accountExist;
        const updatedAccount = [...arrayAccount, bonusOrBurden];
        await extracts.updateOne(
          { userId },
          { $set: { arrayAccount: updatedAccount } }
        );
        return res.sendStatus(200);
      }
      const arrayAccount = [bonusOrBurden];
      await extracts.insertOne({ userId, arrayAccount });
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  } catch (erro) {
    console.log(erro);
  }
}
