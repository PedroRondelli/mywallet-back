import joi from "joi";

export function validateLogin(req, res, next) {
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(8),
  });

  const validation = loginSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res
      .status(422)
      .send(validation.error.details.map((detail) => detail.message));
  }

  next();
}
