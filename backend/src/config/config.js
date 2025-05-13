import "dotenv/config";

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("La variable d'environnement JWT_SECRET_KEY est manquante");
}

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const ACCESS_TOKEN_EXPIRES_IN = "15min";
export const REFRESH_TOKEN_EXPIRE_IN = "7d";
