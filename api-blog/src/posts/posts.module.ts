import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { FilterPaginateMiddleware } from '@app/common/middlewares/req-filter-paginate.middleware';
import { PostRepositoryService } from './repositories/PostRepositoryService';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [Repository, PostsService, PostRepositoryService],
})
export class PostsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FilterPaginateMiddleware).forRoutes('/');
  }
}
