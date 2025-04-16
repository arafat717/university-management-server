import { TAcademicSemester } from "../modules/academicSemester/academicSemester.interface";

export const genarateStudentId = (payload: TAcademicSemester) => {
  const currentId = (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
