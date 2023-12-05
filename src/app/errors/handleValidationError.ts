import mongoose from 'mongoose';
import { TErrorSource, TGenereicErrorResponse } from '../interface/errors';




const handleValidationError  = (err: mongoose.Error.ValidationError):TGenereicErrorResponse => {
  const errorSources: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidationError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );


  const statusCode = 400;
  return {
    statusCode,
    message: ' validation error',
    errorSources,
  };
};

export default handleValidationError;
