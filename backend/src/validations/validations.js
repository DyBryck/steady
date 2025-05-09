import Joi from "joi";
import { ValidationError } from "../errors/customErrors.js";
import { emailSchema, nameSchema, passwordSchema } from "./commonValidations.js";

export const registerStudentSchema = Joi.object({
  firstName: nameSchema.required().messages({ "any.required": "La clé 'firstName' est requise" }),
  lastName: nameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
}).options({ stripUnknown: true });

export const loginStudentSchema = Joi.object({
  email: emailSchema.required(),
});

export const validateData = (schema, data) => {
  const { error, value } = schema.validate(data);

  if (error) throw new ValidationError(error.message);

  return value;
};
