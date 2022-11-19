import joi from "joi";
import bcrypt from "bcrypt";
import {db} from "../index.js"

const registerSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().min(3).required(),
  password: joi.string().required(),
});
export async function registerUser(req, res) {
  const validation = registerSchema.validate(req.body, { abortEarly: false });
  console.log(req)

  if (validation.error) {
    return res
      .status(400)
      .send(validation.error.details.map((detail) => detail.message));
  }
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
