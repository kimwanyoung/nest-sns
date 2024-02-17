import { Controller, Get } from '@nestjs/common';
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
  getPosts() {
    return posts;
  }

  // 2) GET /posts/:id
  //    id에 해당하는 posts를 가져온다.

  // 3) POST /posts
  //    posts를 생성한다.

  // 4) PATCH /posts/:id
  //    id에 해당하는 posts를 변경한다.

  // 5) DELETE /posts/:id
  //    id에 해당하는 posts를 삭제한다.
}