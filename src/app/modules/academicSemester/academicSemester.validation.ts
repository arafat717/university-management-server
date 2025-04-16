import { z } from "zod";

export const monthEnum = z.enum([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    name: z.enum(["Autumn", "Summar", "Fall"]),
    code: z.enum(["01", "02", "03"]),
    year: z.string(),
    startMonth: monthEnum,
    endMonth: monthEnum,
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(["Autumn", "Summar", "Fall"]).optional(),
    code: z.enum(["01", "02", "03"]).optional(),
    year: z.string().optional(),
    startMonth: monthEnum.optional(),
    endMonth: monthEnum.optional(),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterValidationSchema,
};
