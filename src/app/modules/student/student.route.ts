import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlwares/validateRequest";
import { studentValidations } from "./student.joiValidation";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getAllStudent
);
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getSingleStudent
);
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.deleteStudent
);

export const StudentRoute = router;
