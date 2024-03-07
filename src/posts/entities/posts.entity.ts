import { Column, Entity, ManyToOne } from 'typeorm';
import { UsersModel } from '../../users/entities/users.entity';
import { BaseModel } from '../../common/entity/base.entity';
import { IsString } from 'class-validator';

@Entity()
export class PostModel extends BaseModel {
  // UsersModel과 연동한다. Foreign key를 이용해서.
  // null이 될 수 없다.
  @ManyToOne(() => UsersModel, (users) => users.posts, { nullable: false })
  author: UsersModel;

  @Column()
  @IsString({
    message: 'title은 string타입을 입력해주어야 합니다.',
  })
  title: string;

  @Column()
  @IsString({
    message: 'content는 string타입을 입력해주어야 합니다.',
  })
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
