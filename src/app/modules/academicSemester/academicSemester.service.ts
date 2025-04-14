import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  type TacademicSemesterNameCodeMapper = {
    [key: string]: string;
  };

  const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
    Autumn: "01",
    Summar: "02",
    Fall: "03",
  };

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const AccademicSemesterService = {
  createAcademicSemesterIntoDb,
};
