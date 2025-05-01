import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
