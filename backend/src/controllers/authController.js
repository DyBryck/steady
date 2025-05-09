import * as authService from "../services/authService.js";
import * as studentService from "../services/studentService.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { emailSchema } from "../validations/commonValidations.js";
import { registerStudentSchema, validateData } from "../validations/validations.js";

export const register = async (req) => {
  const data = validateData(registerStudentSchema, req.body);

  const hashedPassword = await hashPassword(data.password);

  const body = { ...data, password: hashedPassword };

  const studentCreated = await studentService.createStudent(body);

  return { message: "Inscription réussie", studentCreated };
};

export const login = async (req) => {
  const validEmail = validateData(emailSchema, req.body.email);

  const body = { email: validEmail, password: req.body.password };

  const canLogin = await authService.login(body);

  if (canLogin) return { message: "Connexion réussie" };
};
