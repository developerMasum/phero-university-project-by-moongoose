import { startSession } from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilders';
import { studentSearchAbleFields } from './student.consts';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query }; // copy

  // const studentSearchAbleFields = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchAbleFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // const exclusiveFields = ['searchTerm', 'sort', 'limit','page','fields'];
  // exclusiveFields.forEach((el) => delete queryObj[el]);
  // console.log({ query },{queryObj});

  // const filteredQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filteredQuery.sort(sort);
  // let page = 1;
  // let skip = 0;
  // let limit = 1;

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   limit = Number(query.page);
  //   skip = (page - 1) * limit
  // }
  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery =  paginateQuery.limit(limit);


  // fields Limiting
  // let fields = '_v';
// if (query.fields) {
//   fields = (query.fields as string).split(',').join(' ')
// }
// console.log({fields});
// const fieldsQuery = await limitQuery.select(fields)
//   return fieldsQuery;

const studentQuery = new QueryBuilder(Student.find().populate('admissionSemester')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  }) ,query).search(studentSearchAbleFields).filter().sort().paginate().fields();

const result =await studentQuery.modelQuery;
return result;



};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById( id )
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findByIdAndUpdate( id , modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  // const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      id ,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete student');
    }

    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId ,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete student');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
