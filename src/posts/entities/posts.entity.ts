import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from '../../users/entities/users.entity';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}