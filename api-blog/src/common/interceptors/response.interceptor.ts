/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomResponse<T> {}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, CustomResponse<T>>
{
  private replaceMongoId(item: any) {
    const tmp = {};
    const mongoID = item.hasOwnProperty('_id') ? item._id : null;
    if (mongoID) {
      delete item._id;
      tmp['id'] = mongoID;
      return { ...tmp, ...item };
    }
    return item;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data.hasOwnProperty('buffer')) {
          return;
        }

        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();

        let responseData = {};

        //if errors, set custom status code received
        if (data.errors) {
          data.statusCode = data.statusCode || 406;
          response.status(data.statusCode);

          responseData = { path: request.url, errors: data.errors };
        } else if (data) {
          // Creating a new item
          if (typeof data === 'object' && data.hasOwnProperty('location')) {
            response.status(200).location(data.location);
            responseData = { data: [data] };
          }

          // Returning a single item
          else if (typeof data === 'object') {
            // returning a single file
            if (data.hasOwnProperty('success') && data.hasOwnProperty('file')) {
              response.status(200);
              return { ...data };
            }

            if (data.hasOwnProperty('data')) {
              //response contains data, meta and extra properties
              responseData = { ...this.replaceMongoId(data) };
            } else {
              responseData = { data: this.replaceMongoId(data) };
            }
            response.status(200);
          } else {
            response.status(500);
            responseData = {
              path: request.url,
              errors: [
                {
                  internal_code: 'global-00002',
                  title: 'Internal Server Error',
                  detail: data,
                },
              ],
            };
          }
        } else {
          response.status(404);
          responseData = {
            path: request.url,
            errors: [
              {
                internal_code: 'global-00001',
                title: 'Not Found',
                detail: 'Path or item not found.',
              },
            ],
          };
        }

        return responseData;
      }),
    );
  }
}
