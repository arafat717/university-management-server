import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlwares/validateRequest";
import { studentValidations } from "./student.joiValidation";

const router = express.Router();

router.get("/", StudentControllers.getAllStudent);
router.get("/:studentId", StudentControllers.getSingleStudent);
router.patch(
  "/:studentId",
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoute = router;
