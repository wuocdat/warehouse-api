import { IsOptional, IsString } from 'class-validator';

export class FindSupplierDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;
}
