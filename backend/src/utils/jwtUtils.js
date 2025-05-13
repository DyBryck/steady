import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_EXPIRE_IN,
} from "../config/config.js";
import { UnauthorizedError } from "../errors/customErrors.js";

export const signAccessToken = (payload) => {
  const signOptions = { expiresIn: ACCESS_TOKEN_EXPIRES_IN };
  return jwt.sign(payload, JWT_SECRET_KEY, signOptions);
};

export const signRefreshToken = (payload) => {
  const signOptions = { expiresIn: REFRESH_TOKEN_EXPIRE_IN };
  return jwt.sign(payload, JWT_SECRET_KEY, signOptions);
};

export const verifyToken = (token) => {
  try {
    const { iat, exp, ...payload } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        throw new UnauthorizedError("Token expiré");
      case "JsonWebTokenError":
        if (error.message === "invalid signature") {
          throw new UnauthorizedError("Signature du token invalide");
        } else {
          throw new UnauthorizedError("Token invalide");
        }
      default:
        throw new UnauthorizedError("Erreur lors de la vérification du token");
    }
  }
};
