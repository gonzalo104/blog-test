import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilterPaginationQuery } from '@app/common/middlewares/req-filter-paginate.middleware';
import { PaginatedDto } from '@app/common/interfaces/paginate.dtos';
import { Post, PostsList } from './entities/post.entity';
import { PostRepositoryService } from './repositories/PostRepositoryService';
import { PageMetaDto } from '@app/common/dtos/page-meta.dto';
import { PageDto } from '@app/common/dtos/page.dto';
import { PageLinksDto } from '@app/common/dtos/page-links.dto';
import { PostNotFoundError } from './errors';

@Injectable()
export class PostsService {
  constructor(private readonly postRepositoryService: PostRepositoryService) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.postRepositoryService.create(createPostDto);

    await this.postRepositoryService.save(post);

    return post;
  }

  async findAll(
    filter: FilterPaginationQuery,
  ): Promise<PaginatedDto<PostsList>> {
    const data = await this.postRepositoryService.paginate(filter);
    const total = await this.postRepositoryService.countPaginate(filter);

    const meta = new PageMetaDto({
      pageOptionsDto: {
        page: filter.page,
        skip: filter.limit,
      },
      total_elements: total,
      page_size: filter.limit,
    });

    return new PageDto<PostsList>(data, meta, new PageLinksDto(meta, '/posts'));
  }

  async findOne(id: number) {
    return await this.existsPost(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.existsPost(id);

    const updatedPost = await this.postRepositoryService.save({
      ...post,
      ...updatePostDto,
    });

    return updatedPost;
  }

  async remove(id: number) {
    await this.existsPost(id);

    return await this.postRepositoryService.delete(id);
  }

  async existsPost(id: number): Promise<Post> {
    const post = await this.postRepositoryService.findOne({
      where: { id },
    });

    if (!post) {
      throw new PostNotFoundError(`Post with id ${id} not found`);
    }

    return post;
  }
}
