import mongoose from 'mongoose';
import { TErrorSource, TGenereicErrorResponse } from '../interface/errors';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenereicErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;
