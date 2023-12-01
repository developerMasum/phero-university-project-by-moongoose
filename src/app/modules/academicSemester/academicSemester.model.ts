
import { Schema, model } from "mongoose";
import { TAcademicSemester} from "./academicSemester.interface";
import { AcademicSemesterCodes, AcademicSemesterNames, Months } from "./academicSemester.const";



const academicSemesterSchema = new Schema<TAcademicSemester> (
    {
        name: { type:String,required: true, enum: AcademicSemesterNames},
        year: {type:String , required: true},
        code: {type: String , required: true,enum: AcademicSemesterCodes},
        startMonth: {type : String, enum: Months,required: true},
        endMonth: {type : String ,enum: Months ,required: true }
    }
)


export const academicSemester = model<TAcademicSemester>('academicSemester',academicSemesterSchema)