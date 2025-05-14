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
