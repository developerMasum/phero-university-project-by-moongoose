import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

  // set role

  const userData :Partial<TUser> = {};
  userData.password = password || (config.default_password as string)

  userData.role = 'student';


const generatedStudentId = (payload : TAcademicSemester)=>{
  
}


//   manual id set 
userData.id = '2030100001'


  const newUser = await User.create(userData);
//   create a student 
if (Object.keys(newUser).length) {
    // set _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id //refer id 

    const newStudent = await Student.create(studentData)
    return newStudent
}

};

export const UserService = {
  createStudentIntoDB,
};
