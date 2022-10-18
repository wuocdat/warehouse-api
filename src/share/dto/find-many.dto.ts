import { IsNotEmpty, IsString } from 'class-validator';

export class FindManyDto {
  @IsNotEmpty()
  @IsString()
  pageSize: string;

  @IsNotEmpty()
  @IsString()
  currentPage: string;
}
