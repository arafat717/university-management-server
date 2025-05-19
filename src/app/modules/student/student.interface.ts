/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type userName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: userName;
  email: string;
  dateOfBirth: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  contactNo: string;
  emergencyContactNo: string;
  gender: "male" | "female";
  presentAddress: string;
  permanentAddress: string;
  admissionSemester: Types.ObjectId;
  profileImage: string;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
  gurdian: Gurdian;
};

export type StudentMethod = {
  isUserExists(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethod
>;
