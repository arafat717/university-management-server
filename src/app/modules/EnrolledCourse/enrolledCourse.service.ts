/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../error/AppError";
import { OfferedCourse } from "../OfferedCourse/OfferedCourse.model";
import { Student } from "../student/student.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import status from "http-status";
import { EnrolledCourse } from "./enrolledCourse.model";
import mongoose from "mongoose";
import { SemisterRegistration } from "../semisterRegistration/semisterRegistration.model";

const enrolledCourse = async (userId: string, payload: TEnrolledCourse) => {
  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(
    payload.offeredCourse
  );
  if (!isOfferedCourseExists) {
    throw new AppError(status.NOT_FOUND, "Offered Course not found");
  }

  const student = await Student.findOne({ id: userId }).select("_id");
  if (!student) {
    throw new AppError(status.NOT_FOUND, "Offered Course not found");
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(status.BAD_GATEWAY, "Room is full!");
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      status.NOT_FOUND,
      "Student already enrolled this course"
    );
  }

  const semesterRegistation = await SemisterRegistration.findById(
    isOfferedCourseExists.semesterRegistration
  ).select("maxCredit");

  const enrolledCourse = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
  ]);

  console.log(enrolledCourse);

  // const session = await mongoose.startSession();

  // try {
  //   session.startTransaction();

  //   const result = await EnrolledCourse.create(
  //     [
  //       {
  //         semesterRegistration: isOfferedCourseExists.semesterRegistration,
  //         academicSemester: isOfferedCourseExists.academicSemester,
  //         academicFaculty: isOfferedCourseExists.academicFaculty,
  //         academicDepartment: isOfferedCourseExists.academicDepartmenet,
  //         offeredCourse: offeredCourse,
  //         course: isOfferedCourseExists.course,
  //         student: student._id,
  //         faculty: isOfferedCourseExists.faculty,
  //         isEnrolled: true,
  //       },
  //     ],
  //     session
  //   );

  //   if (!result) {
  //     throw new AppError(status.BAD_REQUEST, "Failed to enroll in this course");
  //   }

  //   const maxCapacity = isOfferedCourseExists.maxCapacity;
  //   await OfferedCourse.findByIdAndUpdate(offeredCourse, {
  //     maxCapacity: maxCapacity - 1,
  //   });

  //   await session.commitTransaction();
  //   await session.endSession();

  //   return result;
  // } catch (err: any) {
  //   await session.abortTransaction();
  //   await session.endSession();
  //   throw new Error(err);
  // }
};

export const enrolledCourseService = {
  enrolledCourse,
};
