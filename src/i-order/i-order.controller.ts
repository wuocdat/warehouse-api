import { FindManyIOrderDto, FindAllIOrderDto } from './dto/i-order.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IOrderService } from './i-order.service';
import { CreateIOrderDto } from './dto/create-i-order.dto';
import { UpdateIOrderDto } from './dto/update-i-order.dto';
import { UserId } from 'src/share/decorators';

@Controller('i-order')
export class IOrderController {
  constructor(private readonly iOrderService: IOrderService) {}

  @Post()
  create(@Body() createIOrderDto: CreateIOrderDto, @UserId() userId: string) {
    return this.iOrderService.create(createIOrderDto, userId);
  }

  @Get()
  findAll(@Query() query: FindManyIOrderDto) {
    return this.iOrderService.findMany(query);
  }

  @Get('count')
  count(@Query() query: FindAllIOrderDto) {
    return this.iOrderService.countIOrders(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIOrderDto: UpdateIOrderDto) {
    return this.iOrderService.update(+id, updateIOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iOrderService.remove(+id);
  }
}
