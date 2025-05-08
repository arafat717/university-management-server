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

// Zod schema for TPreRequisiteCourses
export const updatePreRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

// Zod schema for TCourse
export const updateCreateCoourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(updatePreRequisiteCourseSchema).optional(),
  }),
});

// const updateCreateCourseValidationSchema =
//   createCoourseValidationSchema.partial();

export const CourseValidations = {
  createCoourseValidationSchema,
  updateCreateCoourseValidationSchema,
};
