import { db } from "../index.js";

export async function updateExpenses(req, res) {
  const bonusOrBurden = req.body;
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(token);
  res.sendStatus(200);
}
