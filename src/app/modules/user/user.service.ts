import { TStudent } from "../student/student.interface";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import config from "../../config";
import { Student } from "../student/student.model";

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.student_pass as string);
  userData.role = "student";
  userData.id = "2030100001";

  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    studentData.password = newUser.password;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDb,
};
