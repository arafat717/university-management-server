import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { academicSemesterNameCodeMapper } from "./accademicSemester.constant";

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findOne({ id });
  return result;
};

const updateAcademicSemesterIntoDb = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    { upsert: true }
  );
  return result;
};

export const AccademicSemesterService = {
  createAcademicSemesterIntoDb,
  getAllSemesterFromDb,
  getSingleSemesterFromDb,
  updateAcademicSemesterIntoDb,
};
