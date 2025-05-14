// validations/offeredCourse.validation.ts
import { z } from "zod";

const createOfferedCourseZodSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartmenet: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"])),
      startTime: z.string().refine(
        (time) => {
          const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: 'Invalid time format, expected "HH:MM" in 24 hours format',
        }
      ),
      endTime: z.string().refine(
        (time) => {
          const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: 'Invalid time format, expected "HH:MM" in 24 hours format',
        }
      ),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: "End time must be later than start time",
        path: ["endTime"],
      }
    ),
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
