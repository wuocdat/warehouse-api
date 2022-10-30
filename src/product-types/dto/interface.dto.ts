import { IsOptional, IsString } from 'class-validator';
export class ProductTypeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;
}
