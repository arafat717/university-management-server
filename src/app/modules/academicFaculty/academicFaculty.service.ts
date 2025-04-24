import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFacultyFromDb = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleFacultyFromDb = async (id: string) => {
  const result = await AcademicFaculty.findOne({ id });
  return result;
};

const updateAcademicFacultyIntoDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    upsert: true,
  });
  return result;
};

export const AccademicFacultyService = {
  createAcademicFacultyIntoDb,
  getAllFacultyFromDb,
  getSingleFacultyFromDb,
  updateAcademicFacultyIntoDb,
};
