import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/errors";

const handleZodErr = (err: ZodError) => {
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