// validations/offeredCourse.validation.ts
import { z } from "zod";

const tiemStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format',
  }
);

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
      startTime: tiemStringSchema,
      endTime: tiemStringSchema,
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
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"])),
      startTime: tiemStringSchema,
      endTime: tiemStringSchema,
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

export const offeredCourseValidation = {
  createOfferedCourseZodSchema,
  updateOfferedCourseZodSchema,
};
