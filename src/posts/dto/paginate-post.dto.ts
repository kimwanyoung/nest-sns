import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginatePostDto {
  @IsNumber()
  @IsOptional()
  where__id_less_than?: number;

  // 이전 마지막 데이터의 ID
  // 프로퍼티에 입력된 ID보다 높은 ID로부터 데이터 가져오기
  @IsNumber()
  @IsOptional()
  where__id_more_than?: number;

  // 정렬
  // createdAt -> 생성된 시간의 내림차/오름차 순으로 정렬
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__createdAt: 'ASC' | 'DESC' = 'ASC';

  // 몇개의 데이터를 응답으로 받을
  @IsNumber()
  @IsOptional()
  take?: number = 20;
}
