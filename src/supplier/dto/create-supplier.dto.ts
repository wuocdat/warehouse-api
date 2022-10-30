import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { setRequiredText } from 'src/share/utils';
import { PaymentsEnum } from '../supplier.enum';

export class CreateSupplierDto {
  @IsNotEmpty({ message: setRequiredText('tên') })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  // @IsPhoneNumber('US')
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  wards?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string;

  @IsDefined()
  @IsEnum(PaymentsEnum, { each: true })
  payments: PaymentsEnum[];

  @IsOptional()
  @IsString()
  note?: string;
}
