import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface FilterValidation {
  allowlist?: RegExp[];
  denylist?: RegExp[];
}

interface IFilterRequest extends Request {
  query: {
    filter: string | undefined;
    sort: any | undefined;
    page: string | undefined;
    limit: string | undefined;
    fields: string | undefined;
  };
}

type FilterPaginationQueryOptions = {
  filter: string;
  sort: any;
  page: number;
  limit: number;
  fields: string;
};

export class FilterPaginationQuery {
  filter: object;
  sort: object;
  page: number;
  limit: number;
  fields: string;

  constructor(filter: FilterPaginationQueryOptions) {
    this.filter = this.parseFilter(filter.filter);
    this.sort = this.parseSort(filter.sort);
    this.page = filter.page;
    this.limit = filter.limit;
    this.fields = filter.fields;
  }

  parseFilter(filter: string | undefined): object {
    if (!filter) return {};
    return JSON.parse(filter);
  }

  parseSort(sort: string | undefined): object {
    if (!sort) return {};
    return JSON.parse(sort);
  }

  public isQueryAllowed({ allowlist = [], denylist = [] }: FilterValidation) {
    // validate allowlist and denylist keys
    return true;
  }
}

@Injectable()
export class FilterPaginateMiddleware implements NestMiddleware {
  use(req: IFilterRequest, res: Response, next: NextFunction) {
    try {
      res.locals.filterPaginationQuery = new FilterPaginationQuery({
        filter: req.query.filter || '{}',
        sort: req.query.sort,
        page: Math.max(0, parseInt(req.query.page || '1')),
        limit: req.query.limit ? parseInt(req.query.limit) : 10,
        fields: req.query.fields ? req.query.fields : '',
      });

      return next();
    } catch (e) {
      throw new BadRequestException({
        message: 'Incorrect filter syntax',
        error: e.message,
      });
    }
  }
}
