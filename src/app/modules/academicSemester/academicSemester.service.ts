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



const getAllAcademicSemestersFromDB = async () => {
  const result = await academicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await academicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNamesCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await academicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};


export const AcademicSemesterServices = {
  createAcademicSemesterToDB,
  updateAcademicSemesterIntoDB,
  getSingleAcademicSemesterFromDB,
  getAllAcademicSemestersFromDB
};
