import { z } from "zod";

const createSemisterRegistrationValidation = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const updateSemisterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const SemisterRegistrationValidations = {
  createSemisterRegistrationValidation,
  updateSemisterRegistrationValidationSchema,
};
