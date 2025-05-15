import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { offeredCourseValidation } from "./OfferedCourse.validation";
import { OfferedCourseController } from "./OfferedCourse.controller";

const router = express.Router();

router.post(
  "/create-offered-course",
  validateRequest(offeredCourseValidation.createOfferedCourseZodSchema),
  OfferedCourseController.createOfferedCourse
);

router.get("/", OfferedCourseController.getAllOfferedCourse);
router.get("/:id", OfferedCourseController.getSingleOfferedCourse);
router.patch(
  "/:id",
  validateRequest(offeredCourseValidation.updateOfferedCourseZodSchema),
  OfferedCourseController.updateOfferedCourse
);
router.delete("/:id", OfferedCourseController.deleteOfferedCourse);

export const OfferedCourseRoute = router;
