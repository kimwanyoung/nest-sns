import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe, Patch,
  Post,
  Put, Query,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from '../users/decorator/user.decorator';
import { UsersModel } from '../users/entities/users.entity';
import { AccessTokenGuard } from '../auth/guard/bearer-token.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginatePostDto } from './dto/paginate-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 posts를 가져온다.
  @Get()
  getPosts(@Query() query: PaginatePostDto) {
    return this.postsService.paginatePosts(query);
  }

  // 2) GET /posts/:id
  //    id에 해당하는 posts를 가져온다.
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // 3) POST /posts
  //    posts를 생성한다.
  @Post()
  @UseGuards(AccessTokenGuard)
  postPosts(@User('id') userId: number, @Body() body: CreatePostDto) {
    return this.postsService.createPost(userId, body);
  }

  //posts/random
  @Post('random')
  @UseGuards(AccessTokenGuard)
  async postPostsRandom(@User() user: UsersModel) {
    await this.postsService.generateRandomPosts(user.id);
    return true;
  }

  // 4) PATCH /posts/:id
  //    id에 해당하는 posts를 변경한다.
  @Patch(':id')
  patchPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, body);
  }

  // 5) DELETE /posts/:id
  //    id에 해당하는 posts를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(+id);
  }
}
