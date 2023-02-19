import { setRequiredText } from 'src/share/utils';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ImportOrderStatusE } from '../i-order.enum';

export class CreateIOrderDto {
  @IsNotEmpty({ message: setRequiredText('tên') })
  @IsString()
  supplier: string;

  @IsNotEmpty({ message: setRequiredText('sản phẩm') })
  @IsString()
  product: string;

  @IsDefined()
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cost: number;

  @IsDefined()
  @IsEnum(ImportOrderStatusE)
  status: ImportOrderStatusE;

  @IsNotEmpty({ message: setRequiredText('mã code') })
  @IsString()
  code: string;

  @IsNotEmpty({ message: setRequiredText('ngày nhập') })
  @IsString()
  deliveryDate: string;
}
