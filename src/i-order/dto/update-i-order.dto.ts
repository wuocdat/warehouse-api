import { PartialType } from '@nestjs/mapped-types';
import { CreateIOrderDto } from './create-i-order.dto';

export class UpdateIOrderDto extends PartialType(CreateIOrderDto) {}
