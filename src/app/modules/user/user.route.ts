import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlwares/validateRequest";
import { studentValidations } from "../student/student.joiValidation";
import { facultyValidations } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admim/admin.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);

export const UserRoute = router;
