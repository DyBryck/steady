import { prismaErrorHandler } from "../errors/prismaErrorHandler.js";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createCourseStudent = async (studentId, courseId) =>
  prismaErrorHandler(() =>
    prisma.courseStudent.create({
      data: {
        studentId: studentId,
        courseId: courseId,
      },
    }),
  );

export const deleteCourseStudent = async (studentId, courseId) =>
  prismaErrorHandler(() =>
    prisma.courseStudent.deleteMany({
      where: {
        studentId: studentId,
        courseId: courseId,
      },
    }),
  );
