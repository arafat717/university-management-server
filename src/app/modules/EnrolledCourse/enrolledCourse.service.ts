/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../error/AppError";
import { OfferedCourse } from "../OfferedCourse/OfferedCourse.model";
import { Student } from "../student/student.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import status from "http-status";
import { EnrolledCourse } from "./enrolledCourse.model";
import mongoose from "mongoose";
import { SemisterRegistration } from "../semisterRegistration/semisterRegistration.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { calculateGradeAndPoints } from "./enrolledCourse.utils";

const enrolledCourse = async (userId: string, payload: TEnrolledCourse) => {
  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(
    payload.offeredCourse
  );
  if (!isOfferedCourseExists) {
    throw new AppError(status.NOT_FOUND, "Offered Course not found");
  }

  const course = await Course.findById(isOfferedCourseExists.course);

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
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "enrolledCourseData",
      },
    },
    {
      $unwind: "$enrolledCourseData",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: "$enrolledCourseData.credits" },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);
  const totalCredits =
    enrolledCourse.length > 0 ? enrolledCourse[0]?.totalEnrolledCredits : 0;

  if (
    totalCredits &&
    semesterRegistation?.maxCredit &&
    totalCredits + course?.credits > semesterRegistation?.maxCredit
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      "You have exceeded maximum number of credits !"
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartmenet,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      session
    );

    if (!result) {
      throw new AppError(status.BAD_REQUEST, "Failed to enroll in this course");
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateEnrolledCourseMarkIntoDb = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(status.NOT_FOUND, "Offered Course not found");
  }

  const isSemesterRegistrationExists = await SemisterRegistration.findById(
    semesterRegistration
  );
  if (!isSemesterRegistrationExists) {
    throw new AppError(status.NOT_FOUND, "SemisterRegistration not found");
  }

  const isStudentExists = await Student.findById(student);
  if (!isStudentExists) {
    throw new AppError(status.NOT_FOUND, "Student not found");
  }

  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });
  if (!faculty) {
    throw new AppError(status.NOT_FOUND, "Faculty not found");
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(status.FORBIDDEN, "You are forbidden!");
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks;
    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(finalTerm * 0.3);

    const result = calculateGradeAndPoints(totalMarks);

    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new: true,
    }
  );

  return result;
};

export const enrolledCourseService = {
  enrolledCourse,
  updateEnrolledCourseMarkIntoDb,
};
