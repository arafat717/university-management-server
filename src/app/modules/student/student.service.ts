import { Student } from "./student.model";

const getAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentService = {
  getAllStudentFromDb,
  getSingleStudentFromDb,
};
