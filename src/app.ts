import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/user', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const statusCode = 'its okay '; // Replace with the desired status code
  res.send(statusCode);
};

app.get('/', getAController);

export default app;
