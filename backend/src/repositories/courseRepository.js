import { prismaErrorHandler } from "../errors/prismaErrorHandler.js";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createCourse = async (name) =>
  prismaErrorHandler(() =>
    prisma.course.create({
      data: {
        name,
      },
    }),
  );

export const getCourseById = async (id) =>
  prismaErrorHandler(() =>
    prisma.course.findUniqueOrThrow({
      where: {
        id,
      },
    }),
  );
