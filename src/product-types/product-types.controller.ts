import { ProductTypeDto } from './dto/interface.dto';
import { Controller, Get, Post, Body, Query, Delete } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UserId } from 'src/share/decorators';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Post()
  create(
    @Body() createProductTypeDto: CreateProductTypeDto,
    @UserId() userId: string,
  ) {
    return this.productTypesService.create(createProductTypeDto, userId);
  }

  @Get('/all')
  findAll(@UserId() userId: string) {
    return this.productTypesService.findAllById(userId);
  }

  @Get()
  findMany(@UserId() id: string, @Query() productTypeDto: ProductTypeDto) {
    return this.productTypesService.findMany(id, productTypeDto);
  }

  @Delete('delete-one')
  deleteOne(@Query('id') id: string, @UserId() currentUserId: string) {
    return this.productTypesService.deleteOne(id, currentUserId);
  }
}
