import { TStudent } from "../student/student.interface";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import config from "../../config";
import { Student } from "../student/student.model";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { genarateStudentId } from "../../middlwares/genarateStudentId";

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.student_pass as string);
  userData.role = "student";

  const admistionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  );

  userData.id = await genarateStudentId(admistionSemester);

  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    payload.password = newUser.password;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDb,
};
