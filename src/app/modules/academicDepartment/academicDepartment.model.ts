import { TAcademicDepartment } from './academicDepartment.interface';
import { Schema, model } from 'mongoose';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty'
    
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
