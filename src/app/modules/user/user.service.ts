/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TStudent } from "../student/student.interface";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import config from "../../config";
import { Student } from "../student/student.model";
import { genarateStudentId } from "../../middlwares/genarateStudentId";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import mongoose from "mongoose";
import AppError from "../../error/AppError";
import status from "http-status";
import { Faculty } from "../faculty/faculty.model";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { generateAdminId, generateFacultyId } from "./user.utilites";
import { Admin } from "../admim/admin.model";
import { sentImageToCloudinary } from "../../utils/sentImageToCloudinary";

const createStudentIntoDb = async (
  file: any,
  password: string,
  payload: TStudent
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.student_pass as string);
  userData.role = "student";
  userData.email = payload.email;

  const admistionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  if (!admistionSemester) {
    throw new AppError(400, "Admision Semester is not found");
  }

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );
  if (!academicDepartment) {
    throw new AppError(400, "AcademicDepartment is not found");
  }

  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await genarateStudentId(admistionSemester);

    if (file) {
      const imageName = `${payload.id}${payload.name.firstName}`;
      const path = file?.path;

      // sent image to cloudinary
      const image = await sentImageToCloudinary(imageName, path);
      payload.profileImage = image.secure_url;
    }

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.password = newUser[0].password;
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create user");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    if (file) {
      const imageName = `${payload.id}${payload.name.firstName}`;
      const path = file?.path;

      // sent image to cloudinary
      const image = await sentImageToCloudinary(imageName, path);
      payload.profileImage = image.secure_url;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.password = newUser[0].password;
    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    if (file) {
      const imageName = `${payload.id}${payload.name.firstName}`;
      const path = file?.path;
      // sent image to cloudinary
      const image = await sentImageToCloudinary(imageName, path);
      payload.profileImage = image.secure_url;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.password = newUser[0].password;
    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === "admin") {
    result = await Admin.findOne({ id: userId }).populate("user");
  }
  if (role === "faculty") {
    result = await Faculty.findOne({ id: userId }).populate("user");
  }
  if (role === "student") {
    result = await Student.findOne({ id: userId })
      .populate("user")
      .populate("admissionSemester")
      .populate("academicDepartment");
  }
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserService = {
  createStudentIntoDb,
  createFacultyIntoDB,
  createAdminIntoDB,
  changeStatus,
  getMe,
};
