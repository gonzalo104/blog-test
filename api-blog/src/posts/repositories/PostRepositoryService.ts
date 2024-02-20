import { FilterPaginationQuery } from '@app/common/middlewares/req-filter-paginate.middleware';
import { Post } from '@app/posts/entities/post.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PostRepositoryService extends Repository<Post> {
  private readonly entity = 'post';

  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async AddAndAndWhere(filter, query) {
    Object.keys(filter).forEach((key) => {
      if (key === 'search') {
        query
          .where(`${this.entity}.author ILIKE :value`, {
            value: `%${filter[key]}%`,
          })
          .orWhere(`${this.entity}.title ILIKE :value`, {
            value: `%${filter[key]}%`,
          })
          .orWhere(`${this.entity}.content ILIKE :value`, {
            value: `%${filter[key]}%`,
          });
      } else {
        query.andWhere(`${this.entity}.${key} = :${key}`, {
          [key]: filter[key],
        });
      }
    });
  }

  async paginate({
    filter,
    fields,
    limit,
    page,
    sort,
  }: FilterPaginationQuery): Promise<Post[]> {
    const query = this.createQueryBuilder(this.entity);

    this.AddAndAndWhere(filter, query);

    if (sort) {
      Object.keys(sort).forEach((key) => {
        query.addOrderBy(`${this.entity}.${key}`, sort[key]);
      });
    }

    query.skip((page - 1) * limit).take(limit);

    if (fields) {
      query.select(fields.split(',').map((field) => `${this.entity}.${field}`));
    }

    return await query.getMany();
  }

  async countPaginate({ filter }: FilterPaginationQuery): Promise<number> {
    const query = this.createQueryBuilder(this.entity);

    this.AddAndAndWhere(filter, query);

    return await query.getCount();
  }
}
