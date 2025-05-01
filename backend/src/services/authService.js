import * as studentService from "../services/studentService.js";
import { comparePassword } from "../utils/passwordUtils.js";

export const login = async (body) => {
  const studentFound = await studentService.getStudentByEmail(body.email);

  const isPasswordValid = await comparePassword(body.password, studentFound.password);
  if (!isPasswordValid) throw new Error("Mot de passe incorrect");

  return isPasswordValid;
};
