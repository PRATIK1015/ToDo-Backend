/* eslint-disable @typescript-eslint/no-explicit-any */

export const ErrorCodes = {
  INTERNAL_SERVER_ERROR: {
    status: 500,
    code: 1000,
    message: "Internal server error.",
  },
  UNAUTHORIZED: {
    status: 401,
    code: 1100,
    message: "Unauthorized.",
  },
  BAD_REQUEST: {
    status: 400,
    code: 1200,
    message: "Bad request.",
  },
  INVALID_CREDENTIALS: {
    status: 401,
    code: 1202,
    message: "Invalid credentials.",
  },
  USER_ALREADY_EXISTS: {
    status: 409,
    code: 1302,
    message: "User with the same email already exists.",
  },
  USER_NOT_FOUND: {
    status: 404,
    code: 1401,
    message: "User not found.",
  },
  TODO_NOT_FOUND:{
    status: 404,
    code: 1402,
    message: "Todo not found.",
  },
  EXPIRED_TOKEN: {
    status: 401,
    code: 1501,
    message: "Token has expired.",
  },
  INVALID_TOKEN: {
    status: 401,
    code: 1502,
    message: "Invalid token.",
  },
  INVALID_VALUE: {
    status: 400,
    code: 1503,
    message: "Invalid value.",
  },
  
  CUSTOM_ERROR: (status: number, code: number, message: string) => ({
    status,
    code,
    message,
  }),
  GENERATE_BAD_REQUEST: (errorDescription: string) => ({
    ...ErrorCodes.BAD_REQUEST,
    errorDescription,
  })
};

export const BaseResponse = (result: any) => {
  return { ...result, responseStatus: 200 };
};
