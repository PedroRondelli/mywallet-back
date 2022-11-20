import joi, { object } from "joi";

export function validateExtract(req, res, next) {
  const creditSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().min(3),
    creditOrDebit: joi.string().valid("credit", "debit").required(),
  });

  const validation = creditSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res
      .status(422)
      .send(validation.error.details.map((detail) => detail.message));
  }

  next();
}
