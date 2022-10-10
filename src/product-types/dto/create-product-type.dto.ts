import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { setRequiredText } from 'src/share/utils';

export class CreateProductTypeDto {
  @IsNotEmpty({ message: setRequiredText('tên loại sản phẩm') })
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  note?: string;
}
