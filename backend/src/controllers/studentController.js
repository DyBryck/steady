import * as studentService from "../services/studentService.js";

export const deleteStudent = async (req) => {
  const id = Number(req.params.id);

  await studentService.deleteStudent(id);
};
