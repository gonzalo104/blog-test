import { HttpException, HttpStatus } from '@nestjs/common';

export class PostErrors extends HttpException {}

export class PostErrorUnexpected extends PostErrors {
  constructor(error) {
    super(
      {
        error,
        message: 'An unexpected error ocurred while trying process the request',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class PostNotFoundError extends PostErrors {
  constructor(error) {
    super(
      {
        error,
        message: 'Post not found',
        status: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
