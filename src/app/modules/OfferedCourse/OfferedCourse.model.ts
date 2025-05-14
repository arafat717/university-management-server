import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./OfferedCourse.interface";

const OfferedCourseSchema = new Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: "SemesterRegistration",
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      required: true,
    },
    academicDepartmenet: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: {
      type: String,
      enum: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OfferedCourse = model<TOfferedCourse>(
  "OfferedCourse",
  OfferedCourseSchema
);
