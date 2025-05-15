import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemisterRegistration } from "../semisterRegistration/semisterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";
import status from "http-status";

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartmenet,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExists = await SemisterRegistration.findById(
    semesterRegistration
  );
  if (!isSemesterRegistrationExists) {
    throw new AppError(status.NOT_FOUND, `Semister Registration not found!`);
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcdemicFacultyExists = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!isAcdemicFacultyExists) {
    throw new AppError(status.NOT_FOUND, `Academic Faculty not found!`);
  }

  const isAcademicDepartmenetExists = await AcademicDepartment.findById(
    academicDepartmenet
  );
  if (!isAcademicDepartmenetExists) {
    throw new AppError(status.NOT_FOUND, `Academic Department not found!`);
  }

  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(status.NOT_FOUND, `Course not found!`);
  }

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(status.NOT_FOUND, `Faculty not found!`);
  }

  const isdepartmentdelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartmenet,
  });
  if (!isdepartmentdelongToFaculty) {
    throw new AppError(
      status.BAD_REQUEST,
      `This ${isAcademicDepartmenetExists.name} is not belong to this ${isAcdemicFacultyExists.name}`
    );
  }

  const issameOfferedCourseExistsWithSameRegisteredSemesterWithSamesection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (issameOfferedCourseExistsWithSameRegisteredSemesterWithSamesection) {
    throw new AppError(
      status.BAD_REQUEST,
      `Offered Course with same section is already exist!`
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  assignedSchedules.forEach((schedule) => {
    const existingStartTime = new Date(`1971-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1971-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1971-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1971-01-01T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        status.CONFLICT,
        `This faculty is not avaiiable at that time ! Chose other tieme or day`
      );
    }
  });

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDb = async (query: Record<string, unknown>) => {
  const registrationQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await registrationQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDb = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferedCourseIntoDb = async (
  id: string,
  payload: Partial<TOfferedCourse>
) => {};

export const OfferedCourseService = {
  createOfferedCourseIntoDb,
  getAllOfferedCourseFromDb,
  getSingleOfferedCourseFromDb,
  updateOfferedCourseIntoDb,
};
