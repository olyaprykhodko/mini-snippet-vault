import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiErrorException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    const response = {
      message,
      statusCode: ApiErrorException.formatStatusCode(statusCode),
    };

    super(response, statusCode);
  }

  private static formatStatusCode(statusCode: HttpStatus): string {
    const statusName = HttpStatus[statusCode] ?? 'UNKNOWN_ERROR';

    return `${statusCode} ${statusName}`;
  }
}
