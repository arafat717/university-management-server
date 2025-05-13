import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { SemisterRegistrationServiceController } from "./semisterRegistration.controller";
import { SemisterRegistrationValidations } from "./semisterRegistration.validation";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    SemisterRegistrationValidations.createSemisterRegistrationValidation
  ),
  SemisterRegistrationServiceController.createSemisterRegistration
);

router.get(
  "/",
  SemisterRegistrationServiceController.getAllSemisterRegistration
);
router.get(
  "/:id",
  SemisterRegistrationServiceController.getSingleSemisterRegistration
);
router.patch(
  "/:id",
  validateRequest(
    SemisterRegistrationValidations.updateSemisterRegistrationValidationSchema
  ),
  SemisterRegistrationServiceController.updateSemisterRegistration
);

export const semisterRegistrationRoute = router;
