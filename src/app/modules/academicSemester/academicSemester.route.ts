import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlwares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidations.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get("/", AcademicSemesterController.getAllSemester);
router.get("/:id", AcademicSemesterController.getSingleSemester);
router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.updateAcademicSemester
);

export const academicSemisterRoute = router;
