import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * author: string
 * title: string
 * content: string
 * likeCount: number
 * commentCount: number
 */
interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPost(): Post {
    return {
      author: 'test author',
      title: 'this is test post',
      content: 'test post',
      likeCount: 10,
      commentCount: 5,
    };
  }
}
