import { BadRequestError } from "../errors/customErrors.js";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createStudent = async (data) => {
  try {
    return await prisma.student.create({
      data,
    });
  } catch (error) {
    if (error.code === "P2002") throw new BadRequestError("Cet email est déjà pris.");
  }
};

export const getStudentByEmail = async (email) => {
  return await prisma.student.findUniqueOrThrow({
    where: {
      email,
    },
  });
};

export const deleteStudent = async (id) => {
  return await prisma.student.delete({
    where: {
      id,
    },
  });
};
