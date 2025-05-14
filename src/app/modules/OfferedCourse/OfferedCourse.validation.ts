// validations/offeredCourse.validation.ts
import { z } from "zod";

const createOfferedCourseZodSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartmenet: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"])),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

const updateOfferedCourseZodSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const offeredCourseValidation = {
  createOfferedCourseZodSchema,
  updateOfferedCourseZodSchema,
};
