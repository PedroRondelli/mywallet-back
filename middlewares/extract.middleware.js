import joi from "joi";

export function validateExtract(req, res, next) {
  const extractSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().min(3).required(),
    creditOrDebit: joi.string().valid("credit", "debit").required(),
    date: joi.string(),
  });

  const validation = extractSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res
      .status(422)
      .send(validation.error.details.map((detail) => detail.message));
  }

  next();
}
