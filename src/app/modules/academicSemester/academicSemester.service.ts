import { AcademicSemesterNamesCodeMapper } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { academicSemester } from './academicSemester.model';

const createAcademicSemesterToDB = async (payload: TAcademicSemester) => {
  // semester name --->



  // before save :here sending {Fall} will match with  (AcademicSemesterNamesCodeMapper[payload.name]

  if (AcademicSemesterNamesCodeMapper[payload.name]! == payload.code) {
    throw new Error('Invalid Semester Code ');
  }

  const result = await academicSemester.create(payload);

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterToDB,
};
