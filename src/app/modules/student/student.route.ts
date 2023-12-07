import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();


router.get('/:id',
validateRequest(updateStudentValidationSchema),

StudentControllers.getSingleStudent);

router.patch('/:id', StudentControllers.updateStudent);
router.delete('/:id', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
