import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';
import { Schema, model } from 'mongoose';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  {
    timestamps: true,
  },
);

AcademicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Department is already exists ',
    );
  }
  next();
});

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne(query);
  if (!isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Department is doesnt exists ',
    );
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
