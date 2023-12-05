import mongoose from 'mongoose';
import { TErrorSource, TGenereicErrorResponse } from '../interface/errors';

const handleDuplicateError = (err:any): TGenereicErrorResponse => {
const match  = err.message.match(/"([^"]*)"/);
const extractMessage = match && match[1]

  const errorSources: TErrorSource = [
    {
      path: '',
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: `${extractMessage} is already exists`,
    errorSources,
  };
};

export default handleDuplicateError;
