import AppError from "../../error/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemisterRegistration } from "./semisterRegistration.interface";
import status from "http-status";
import { SemisterRegistration } from "./semisterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semisterRegistration.constant";
import mongoose from "mongoose";
import { OfferedCourse } from "../OfferedCourse/OfferedCourse.model";

const createSemisterRegistrationIntoDb = async (
  payload: TSemisterRegistration
) => {
  const academicSemester = payload.academicSemester;

  const isSemisterOngoingOrUpcaming = await SemisterRegistration.findOne({
    $or: [
      {
        status: RegistrationStatus.UPCOMING,
      },
      {
        status: RegistrationStatus.ONGOING,
      },
    ],
  });

  if (isSemisterOngoingOrUpcaming) {
    throw new AppError(
      status.BAD_REQUEST,
      `There is already an ${isSemisterOngoingOrUpcaming.status} semister!`
    );
  }

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

const updateSemisterRegistrationIntoDb = async (
  id: string,
  payload: Partial<TSemisterRegistration>
) => {
  const isSemisterRegistrationExists = await SemisterRegistration.findById(id);
  const requestStatus = payload?.status;
  if (!isSemisterRegistrationExists) {
    throw new AppError(status.NOT_FOUND, `SemisterRegistration not found!`);
  }

  const currentSemesterStatus = isSemisterRegistrationExists.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      status.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestStatus}`
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestStatus}`
    );
  }

  const result = await SemisterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSemesterRegistrationFromDb = async (id: string) => {
  const isSemesterRegistrationExists = await SemisterRegistration.findById(id);
  // console.log(isSemesterRegistrationExists);
  if (!isSemesterRegistrationExists) {
    throw new AppError(status.NOT_FOUND, "Semester Registration not found");
  }

  if (isSemesterRegistrationExists.status !== "UPCOMING") {
    throw new AppError(
      status.NOT_FOUND,
      `Semester Registration can not be update because it is ${isSemesterRegistrationExists.status}`
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteOfferedCourse = await OfferedCourse.findOneAndDelete(
      {
        semesterRegistration: id,
      },
      { session }
    );

    const deleteRegistration = await SemisterRegistration.findByIdAndDelete(
      id,
      { session }
    );

    const deletedFields = {
      deleteOfferedCourse,
      deleteRegistration,
    };

    await session.commitTransaction();
    await session.endSession();

    return deletedFields;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.INTERNAL_SERVER_ERROR, (err as Error).message);
  }
};

export const SemisterRegistrationService = {
  deleteSemesterRegistrationFromDb,
  createSemisterRegistrationIntoDb,
  updateSemisterRegistrationIntoDb,
  getSingleSemisterRegistrationFromDb,
  getAllSemisterRegistrationFromDb,
};
