import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 posts를 가져온다.
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
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
  postPosts(
    @Body('authorId') authorId: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(parseInt(authorId), title, content);
  }

  // 4) PATCH /posts/:id
  //    id에 해당하는 posts를 변경한다.
  @Put(':id')
  putPost(
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(id, title, content);
  }

  // 5) DELETE /posts/:id
  //    id에 해당하는 posts를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(+id);
  }
}
