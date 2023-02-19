import { FindManyDto } from 'src/share/dto/find-many.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class FindAllIOrderDto {
  @IsOptional()
  @IsString()
  code?: string;
}

export class FindManyIOrderDto extends IntersectionType(
  FindAllIOrderDto,
  FindManyDto,
) {}
