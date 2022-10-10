import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { setRequiredText } from 'src/share/utils';

export class CreateBrandDto {
  @IsNotEmpty({ message: setRequiredText('tên nhãn hiệu') })
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
