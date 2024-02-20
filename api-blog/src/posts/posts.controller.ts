import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Post as IPost, PostsList } from './entities/post.entity';
import { FilterPaginate } from 'src/common/decorators/req-filter-paginate.decorator';
import { FilterPaginationQuery } from 'src/common/middlewares/req-filter-paginate.middleware';
import { PaginatedDto } from 'src/common/interfaces/paginate.dtos';
import { ResponseInterceptor } from '@app/common/interceptors/response.interceptor';

@ApiTags('posts')
@UseInterceptors(ResponseInterceptor)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiBody({ description: 'The post details', type: CreatePostDto })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully created.',
    type: IPost,
  })
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'List of all posts.',
    type: [PostsList],
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'The filter query parameter',
    example: '?filter={"title": "My post title"}',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page query parameter, defaults to 1',
    example: '&page=1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The limit query parameter, defaults to 10',
    example: '&limit=10',
  })
  @ApiQuery({
    name: 'fields',
    required: false,
    description: 'The fields query parameter',
    example: '&fields=id,guest_name',
  })
  @Get()
  async findAll(
    @FilterPaginate() filter: FilterPaginationQuery,
  ): Promise<PaginatedDto<PostsList>> {
    return await this.postsService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  @ApiResponse({
    status: 200,
    description: 'The post with the matching id.',
    type: IPost,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update post' })
  @ApiBody({
    description: 'The new post details',
    type: UpdatePostDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(+id, updatePostDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postsService.remove(+id);
  }
}
