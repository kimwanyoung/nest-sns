import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostModel } from '../../posts/entities/posts.entity';
import { BaseModel } from '../../common/entity/base.entity';
import { IsEmail, IsString, Length } from 'class-validator';
import { lengthValidationMessage } from '../../common/validation-message/length-validation.message';
import { stringValidationMessage } from '../../common/validation-message/string-validation.message';
import { emailValidationMessage } from '../../common/validation-message/email-validation.message';

@Entity()
export class UsersModel extends BaseModel {
  /*
  id: number
  nickname: string
  email: string
  password: string
  role: Enum(USER, ADMIN)
   */

  @Column({
    // 1)
    length: 20,
    // 2)
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @Length(1, 20, {
    message: lengthValidationMessage,
  })
  // 1) 길이가 20을 넘지 않을 것
  // 2) 유일무이한 값
  nickname: string;

  @Column({
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @IsEmail(null, {
    message: emailValidationMessage,
  })
  // 1) 유일무이한 값
  email: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  @Length(3, 8, {
    message: lengthValidationMessage,
  })
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
