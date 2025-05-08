import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseController } from "./course.controller";

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

export const courseRoute = router;
