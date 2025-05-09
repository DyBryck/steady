import { prismaErrorHandler } from "../errors/prismaErrorHandler.js";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createStudent = async (data) =>
  prismaErrorHandler(() =>
    prisma.student.create({
      data: data,
    }),
  );

export const getStudentByEmail = async (email) =>
  prismaErrorHandler(() =>
    prisma.student.findUniqueOrThrow({
      where: {
        email,
      },
    }),
  );

export const getStudentById = async (id) =>
  prismaErrorHandler(() =>
    prisma.student.findUniqueOrThrow({
      where: {
        id,
      },
    }),
  );

export const deleteStudent = async (id) =>
  prismaErrorHandler(() =>
    prisma.student.delete({
      where: {
        id,
      },
    }),
  );
