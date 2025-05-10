import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseController } from "./course.controller";
import { valid } from "joi";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidations.createCoourseValidationSchema),
  CourseController.createCourse
);

router.get("/", CourseController.getAllCourse);
router.get("/:id", CourseController.getSingleCourse);
router.delete("/:id", CourseController.deleteCourse);
router.patch(
  "/:id",
  validateRequest(CourseValidations.updateCreateCoourseValidationSchema),
  CourseController.updateCourse
);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignfaculltiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removefaculltiesWithCourse
);

export const courseRoute = router;
