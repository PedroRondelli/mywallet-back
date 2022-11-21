import { db } from "../index.js";

export async function deleteSession(req, res) {
  const sessions = db.collections("sessions");
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const deletingSession = await sessions.findOne({ token });
    if (deletingSession) {
      await sessions.deleteOne({ token });
      return res.send("Deleted").status(200);
    }
    return res.send("usuário não está logado").status(400);
  } catch (error) {
    console.log(error);
  }
}
