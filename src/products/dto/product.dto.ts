import { IntersectionType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { FindManyDto } from 'src/share/dto/find-many.dto';

export class FindAllProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  productTypes?: string[];

  @IsOptional()
  @IsArray()
  brands?: string[];
}

export class FindManyProductDto extends IntersectionType(
  FindAllProductDto,
  FindManyDto,
) {}
