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

export const academicSemisterRoute = router;
