import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
