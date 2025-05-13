import * as studentService from "../services/studentService.js";
import { verifyToken } from "../utils/jwtUtils.js";

export const deleteStudent = async (req) => {
  const id = Number(req.params.id);

  await studentService.deleteStudent(id);
};

export const getProfile = async (req) => {
  const token = req.headers.authorization.split(" ")[1];

  const { id } = verifyToken(token);

  const studentFound = await studentService.getStudentById(id);
  const courses = studentFound.courses.map(({ course }) => course);

  const student = {
    firstName: studentFound.firstName,
    lastName: studentFound.lastName,
    email: studentFound.email,
    courses: courses,
  };

  return { message: "Profil étudiant trouvé", student };
};
