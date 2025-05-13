import * as authService from "../services/authService.js";
import * as studentService from "../services/studentService.js";
import { signAccessToken, verifyToken } from "../utils/jwtUtils.js";
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

export const login = async (req, res) => {
  const validEmail = validateData(emailSchema, req.body.email);

  const body = { email: validEmail, password: req.body.password };

  const { refreshToken, accessToken } = await authService.login(body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return { message: "Connexion réussie", accessToken };
};

export const refreshToken = async (req) => {
  const refreshToken = req.cookies.refreshToken;

  const payload = verifyToken(refreshToken);

  const newAccessToken = signAccessToken(payload);

  return { message: "Nouveau token d'accès généré", accessToken: newAccessToken };
};

export const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
};
