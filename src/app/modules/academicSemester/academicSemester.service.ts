import { TAcademicSemesterCodes } from "./academicSemester.interface";
import { academicSemester } from "./academicSemester.model";


const createAcademicSemesterToDB = async (payload: TAcademicSemesterCodes ) => {
const result = await academicSemester.create(payload)

return result

}

  

export const AcademicSemesterServices = {
  createAcademicSemesterToDB,
};
