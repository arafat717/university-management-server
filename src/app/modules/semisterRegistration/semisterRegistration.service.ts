import AppError from "../../error/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemisterRegistration } from "./semisterRegistration.interface";
import status from "http-status";
import { SemisterRegistration } from "./semisterRegistration.model";

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

const getAllSemisterRegistrationFromDb = async () => {};

const getSingleSemisterRegistrationFromDb = async () => {};

const updateSemisterRegistrationIntoDb = async () => {};

export const SemisterRegistrationService = {
  createSemisterRegistrationIntoDb,
  updateSemisterRegistrationIntoDb,
  getSingleSemisterRegistrationFromDb,
  getAllSemisterRegistrationFromDb,
};
