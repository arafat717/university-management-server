import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlwares/validateRequest";
import { studentValidations } from "./student.joiValidation";

const router = express.Router();

router.get("/", StudentControllers.getAllStudent);
router.get("/:id", StudentControllers.getSingleStudent);
router.patch(
  "/:id",
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.delete("/:id", StudentControllers.deleteStudent);

export const StudentRoute = router;
