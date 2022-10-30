import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { setRequiredText } from 'src/share/utils';

export class CreateProductDto {
  @IsNotEmpty({ message: setRequiredText('tên') })
  @MaxLength(45)
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsDefined()
  @IsNotEmpty({ message: setRequiredText('đơn vị tính') })
  @IsString()
  unit: string;

  @IsDefined()
  @IsNumber()
  retailPrice: number;

  @IsDefined()
  @IsNumber()
  importPrice: number;

  @IsOptional()
  @IsNumber()
  wholesalePrice?: number;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsDefined()
  @IsString()
  productType: string;

  @IsDefined()
  @IsString()
  brand: string;

  @IsOptional()
  @IsBoolean()
  tax?: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
