import config from '../../config';
import { academicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {

  // set role

  const userData :Partial<TUser> = {};
  userData.password = password || (config.default_password as string)

  userData.role = 'student';



// find academic semester id 
const admissionSemester = await academicSemester.findById(payload.admissionSemester)

//   manual id set 
userData.id = await generatedStudentId(admissionSemester)

  const newUser = await User.create(userData);
//   create a student 
if (Object.keys(newUser).length) {
    // set _id as user
    payload.id = newUser.id;
    payload.user = newUser._id //refer id 

    const newStudent = await Student.create(payload)
    return newStudent
}

};

export const UserService = {
  createStudentIntoDB,
};
