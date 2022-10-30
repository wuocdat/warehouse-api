import { ProductsService } from './../products/products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { ProductTypesController } from './product-types.controller';
import { ProductType, ProductTypeSchema } from './schemas/product-type.schema';
import { Brand, BrandSchema } from 'src/brand/schemas/brand.schema';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductType.name, schema: ProductTypeSchema },
      { name: Brand.name, schema: BrandSchema },
    ]),
  ],
  controllers: [ProductTypesController],
  providers: [ProductTypesService, ProductsService],
})
export class ProductTypesModule {}
