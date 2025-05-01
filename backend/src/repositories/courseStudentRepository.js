import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createCourseStudent = async (userId, courseId) => {
  return await prisma.courseStudent.create({
    data: {
      studentId: userId,
      courseId: courseId,
    },
  });
};
