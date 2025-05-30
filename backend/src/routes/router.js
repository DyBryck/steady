import express from "express";
import * as authController from "../controllers/authController.js";
import * as courseController from "../controllers/courseController.js";
import * as courseStudentController from "../controllers/courseStudentController.js";
import * as studentController from "../controllers/studentController.js";
import { handleRequest } from "../utils/handleRequestUtils.js";

const router = express();

// Auth
router.post("/auth/register", handleRequest(authController.register));
router.post("/auth/login", handleRequest(authController.login));
router.post("/auth/refresh-token", handleRequest(authController.refreshToken));
router.delete("/auth/logout", handleRequest(authController.logout));

// Students
router.get("/students/me", handleRequest(studentController.getProfile));
router.delete("/students/:id", handleRequest(studentController.deleteStudent));

// Courses
router.get("/courses", handleRequest(courseController.getAllCourses));
router.post("/courses", handleRequest(courseController.createCourse));

// CourseStudents (relation between courses & students)
router.post("/course-students", handleRequest(courseStudentController.createCourseStudent));
router.delete("/course-students", handleRequest(courseStudentController.deleteCourseStudent));

export default router;
