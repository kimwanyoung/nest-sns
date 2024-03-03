import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './entities/posts.entity';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostModel,
    ]),
    AuthModule,
    UsersModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
