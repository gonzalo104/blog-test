import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

interface CustomError {
  internal_code: string;
  title: string;
  detail: any;
}

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: unknown) => {
  return exception instanceof HttpException
    ? exception.getResponse()
    : exception;
};
const getErrorCode = (errors) => {
  return typeof errors['code'] !== 'undefined'
    ? `global-${errors['code']}`
    : 'global-00003';
};
const getExplicitError = (errors) => {
  let explicitError = '';
  if (typeof errors['code'] !== 'undefined') {
    switch (errors['code']) {
      case 11000:
        explicitError = 'Duplicate key error collection';
        break;
    }
  }
  return explicitError;
};

const isInternalErrorServer = (status) => {
  return status === HttpStatus.INTERNAL_SERVER_ERROR;
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = getStatusCode(exception);
    const errorsFound = getErrorMessage(exception);

    const errors: CustomError = {
      internal_code: getErrorCode(errorsFound),
      title: 'Exception',
      detail: errorsFound,
    };

    if (errors.detail.explicitMsg)
      errors.detail.explicitMsg = getExplicitError(errorsFound);

    if (isInternalErrorServer(status)) {
      console.log(exception);
    }

    response.status(status).json({
      path: request.url,
      errors: [errors],
    });
  }
}
