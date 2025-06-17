type TacademicSemesterNameCodeMapper = {
  [key: string]: string;
};

export const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
  Autumn: "01",
  Summar: "02",
  Fall: "03",
};

export const AcademicSemesterSearchableFields = ["name", "year"];
