import { Schema, model } from "mongoose";
import {
  Gurdian,
  TStudent,
  StudentMethod,
  StudentModel,
  userName,
} from "./student.interface";

const GurdianSchema = new Schema<Gurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const userNameSchema = new Schema<userName>({
  firstName: { type: String, required: [true, "First Name Is Required"] },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: String },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not valid",
      },
      required: true,
    },
    presentAddress: { type: String, required: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    profileImage: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
    permanentAddress: { type: String, required: true },
    gurdian: { type: GurdianSchema, required: true },
  },
  {
    timestamps: true,
  }
);

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
