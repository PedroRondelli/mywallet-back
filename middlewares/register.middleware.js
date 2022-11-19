import joi from "joi";

export function validateRegister(req, res, next) {
  const registerSchema = joi.object({
    email: joi.string().email().required(),
    name: joi.string().min(3).required(),
    password: joi.string().required(),
  });

  const validation = registerSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res
      .status(422)
      .send(validation.error.details.map((detail) => detail.message));
  }

  next();
}
