import { HttpStatus } from '@nestjs/common';

export const buildSuccessResponse = <T>(
  statusCode: HttpStatus,
  message: string,
  data: T,
) => {
  return {
    statusCode,
    message,
    data,
  };
};
