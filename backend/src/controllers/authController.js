import * as authService from "../services/authService.js";
import * as studentService from "../services/studentService.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const register = async (req) => {
  const hashedPassword = await hashPassword(req.body.password);

  const body = { ...req.body, password: hashedPassword };

  const studentCreated = await studentService.createStudent(body);

  return { message: "Étudiant inscrit avec succès", studentCreated };
};

export const login = async (req) => {
  const body = { email: req.body.email, password: req.body.password };

  const canLogin = await authService.login(body);

  if (canLogin) return { message: "Connexion réussie" };
};
