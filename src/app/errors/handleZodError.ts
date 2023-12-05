import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenereicErrorResponse } from "../interface/errors";

const handleZodErr = (err: ZodError):TGenereicErrorResponse => {
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    const statusCode = 400;

    return {
      statusCode,
      message: 'Zod validation error',
      errorSources,
    };
  };
  export default handleZodErr;