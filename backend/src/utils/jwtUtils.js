import jwt from "jsonwebtoken";

const JWT_SECRET_KEY =
  process.env.JWT_SECRET_KEY ||
  "58e1eb811a283fdb116c98d31a52059c4f3a55bd073f8cd5876c5325aa5361d365c491430a5bd54130835d829f2743afb538bd55dbbf12ceb9e1285258ee6e5f";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRE_IN = "7d";

const testToken = jwt.sign(
  {
    data: "foobar",
  },
  JWT_SECRET_KEY,
  { expiresIn: REFRESH_TOKEN_EXPIRE_IN },
);

console.log(testToken);

const decoded = jwt.verify(testToken, JWT_SECRET_KEY);

console.log(decoded);
