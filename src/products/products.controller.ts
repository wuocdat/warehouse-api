import { MAX_UPLOAD_FILE_SIZE } from './../config/file.config';
import { FindManyProductDto, FindAllProductDto } from './dto/product.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  Header,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserId } from 'src/share/decorators';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @UserId() userId: string) {
    return this.productsService.create(createProductDto, userId);
  }

  @Get()
  findMany(@Query() query: FindManyProductDto, @UserId() userId: string) {
    return this.productsService.findMany(query, userId);
  }

  @Get('count')
  count(@Query() query: FindAllProductDto, @UserId() userId: string) {
    return this.productsService.count(query, userId);
  }

  @Get('export-excel-file')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  exportFile(
    @Query() query: FindAllProductDto,
    @UserId() userId: string,
    @Res() res: Response,
  ) {
    return this.productsService.exportToXlsx(query, userId, res);
  }

  @Get('download-template')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  downloadTemplate(@Res() res: Response) {
    return this.productsService.downloadTemplate(res);
  }

  @Post('upload-file')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: MAX_UPLOAD_FILE_SIZE,
      },
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @UserId() userId: string,
  ) {
    return this.productsService.uploadFile(file, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
