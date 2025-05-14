import { Types } from "mongoose";

export type Days = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicDepartmenet: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: Days;
  startTime: string;
  endTime: string;
};
