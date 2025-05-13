import { z } from "zod";

const createSemisterRegistrationValidation = z.object({
  body: z.object({}),
});

const updateSemisterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

export const SemisterRegistrationValidations = {
  createSemisterRegistrationValidation,
  updateSemisterRegistrationValidationSchema,
};
