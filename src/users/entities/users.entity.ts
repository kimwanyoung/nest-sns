import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';

@Entity()
export class UserModel {
  /*
  id: number
  nickname: string
  email: string
  password: string
  role: Enum(USER, ADMIN)
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    // 1)
    length: 20,
    // 2)
    unique: true,
  })
  // 1) 길이가 20을 넘지 않을 것
  // 2) 유일무이한 값
  nickname: string;

  @Column({
    unique: true,
  })
  // 1) 유일무이한 값
  email: string;

  @Column()
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;
}
