import { z } from "zod";

// Zod schema for TPreRequisiteCourses
export const preRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

// Zod schema for TCourse
export const createCoourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(preRequisiteCourseSchema).optional(),
  }),
});

export const CourseValidations = {
  createCoourseValidationSchema,
};
