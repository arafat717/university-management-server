/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../error/AppError";
import status from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

const getAllStudentFromDb = async (query: Record<string, unknown>) => {
  let searchTerm = "";
  const queryObj = { ...query };

  const studentSearchableFeilds = ["email", "name.firstName", "presentAddress"];

  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFeilds.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  //filtering
  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];

  excludeFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  let sort = "-createdAt";

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 1;

  if (query.limit) {
    limit = Number(query.limit);
  }

  const paginationQuery = sortQuery.skip(skip);

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const limitQuery = paginationQuery.limit(limit);

  let fields = "--v";
  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id }, { isDeleted: false })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, gurdian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdatedData[`gurdian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletestudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deleteStudent) {
      throw new AppError(status.BAD_REQUEST, "Failed to create student");
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteUser) {
      throw new AppError(status.BAD_REQUEST, "Failed to create user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentService = {
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deletestudentFromDb,
  updateStudentIntoDb,
};
