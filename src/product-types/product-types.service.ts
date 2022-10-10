import {
  ProductType,
  ProductTypeDocument,
} from './schemas/product-type.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { Model } from 'mongoose';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectModel(ProductType.name)
    private readonly productTypeModel: Model<ProductTypeDocument>,
  ) {}

  create(createProductTypeDto: CreateProductTypeDto, currentUserId: string) {
    const result = {
      ...createProductTypeDto,
      createdBy: currentUserId,
      updatedBy: currentUserId,
    };
    return this.productTypeModel.create(result);
  }

  findAllById(userId: string) {
    return this.productTypeModel
      .find({ createdBy: userId, isActive: true })
      .select('-__v')
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} productType`;
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    return `This action updates a #${id} productType`;
  }

  remove(id: number) {
    return `This action removes a #${id} productType`;
  }
}
