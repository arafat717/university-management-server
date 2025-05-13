import AppError from "../../error/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemisterRegistration } from "./semisterRegistration.interface";
import status from "http-status";
import { SemisterRegistration } from "./semisterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSemisterRegistrationIntoDb = async (
  payload: TSemisterRegistration
) => {
  const academicSemester = payload.academicSemester;
  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(status.NOT_FOUND, "This academic semester not found !");
  }

  const isSemesterRegistrationExists = await SemisterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(status.CONFLICT, "This semester is already registered!");
  }

  const result = await SemisterRegistration.create(payload);
  return result;
};

const getAllSemisterRegistrationFromDb = async (
  query: Record<string, unknown>
) => {
  const registrationQuery = new QueryBuilder(
    SemisterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await registrationQuery.modelQuery;
  return result;
};

const getSingleSemisterRegistrationFromDb = async (id: string) => {
  const result = await SemisterRegistration.findById(id).populate(
    "academicSemester"
  );
  return result;
};

const updateSemisterRegistrationIntoDb = async () => {};

export const SemisterRegistrationService = {
  createSemisterRegistrationIntoDb,
  updateSemisterRegistrationIntoDb,
  getSingleSemisterRegistrationFromDb,
  getAllSemisterRegistrationFromDb,
};
