import mongoose from 'mongoose';
import config from '../../config';
import { academicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // set role

  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  // find academic semester id
  const admissionSemester = await academicSemester.findById(
    payload.admissionSemester,
  );

  //  transaction and rollback

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //   manual id set
    userData.id = await generatedStudentId(admissionSemester);
    // transaction -1
    const newUser = await User.create([userData], { session });
    //   create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user');
    }
    // set _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //refer id
    // transaction -2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserService = {
  createStudentIntoDB,
};
