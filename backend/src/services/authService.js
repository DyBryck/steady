import * as studentService from "../services/studentService.js";
import { signAccessToken, signRefreshToken } from "../utils/jwtUtils.js";
import { comparePassword } from "../utils/passwordUtils.js";

export const login = async (body) => {
  const studentFound = await studentService.getStudentByEmail(body.email);

  const isPasswordValid = await comparePassword(body.password, studentFound.password);
  if (!isPasswordValid) throw new Error("Mot de passe incorrect");

  const payload = {
    id: studentFound.id,
    firstName: studentFound.firstName,
    lastName: studentFound.lastName,
  };

  const refreshToken = signRefreshToken(payload);
  const accessToken = signAccessToken(payload);

  return { refreshToken, accessToken };
};
