import { z } from "zod";

const createSemisterRegistrationValidation = z.object({
  body: z.object({}),
});

const updateSemisterRegistrationValidationSchema = z.object({
  body: z.object({}),
});

export const SemisterRegistrationValidations = {
  createSemisterRegistrationValidation,
  updateSemisterRegistrationValidationSchema,
};
