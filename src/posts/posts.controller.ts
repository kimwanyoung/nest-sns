import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * author: string
 * title: string
 * content: string
 * likeCount: number
 * commentCount: number
 */
interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'tester',
    title: 'test title',
    content: 'test content',
    likeCount: 10,
    commentCount: 8,
  },
  {
    id: 2,
    author: 'tester2',
    title: 'test title2',
    content: 'test content2',
    likeCount: 102,
    commentCount: 82,
  },
  {
    id: 3,
    author: 'tester3',
    title: 'test title3',
    content: 'test content3',
    likeCount: 103,
    commentCount: 83,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 posts를 가져온다.
  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  // 2) GET /posts/:id
  //    id에 해당하는 posts를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  // 3) POST /posts
  //    posts를 생성한다.
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): PostModel {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    posts = [...posts, post];
    return post;
  }

  // 4) PATCH /posts/:id
  //    id에 해당하는 posts를 변경한다.

  // 5) DELETE /posts/:id
  //    id에 해당하는 posts를 삭제한다.
}
