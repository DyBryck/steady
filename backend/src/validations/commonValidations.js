import Joi from "joi";

export const nameSchema = Joi.string()
  .trim()
  .min(2)
  .max(50)
  .messages({ "string.min": "Le prénom et le nom doivent avoir au moins 2 caractères" });

export const emailSchema = Joi.string()
  .trim()
  .email()
  .messages({ "string.email": "L'email doit être valide" });

export const passwordSchema = Joi.string()
  .trim()
  .min(10)
  .messages({ "string.min": "Le mot de passe doit avoir au moins 10 caractères" });
