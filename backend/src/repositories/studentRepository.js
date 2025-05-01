import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createStudent = async (data) => {
  try {
    return await prisma.student.create({
      data,
    });
  } catch (error) {
    if (error.message.match(/Argument `[a-zA-Z]+` is missing./)) throw new Error(error.message);
    else if (error.message.match(/Unique constraint failed/)) throw new Error(error.message);
    else throw new Error(error.message);
  }
};

export const getStudentByEmail = async (email) => {
  return await prisma.student.findUniqueOrThrow({
    where: {
      email,
    },
  });
};
