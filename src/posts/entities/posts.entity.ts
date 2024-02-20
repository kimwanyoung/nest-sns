import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersModel } from '../../users/entities/users.entity';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  // UsersModel과 연동한다. Foreign key를 이용해서.
  // null이 될 수 없다.
  @ManyToOne(() => UsersModel, (users) => users.posts, { nullable: false })
  author: UsersModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}