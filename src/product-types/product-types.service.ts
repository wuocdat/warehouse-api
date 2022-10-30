import { ProductsService } from './../products/products.service';
import { ProductTypeDto } from './dto/interface.dto';
import {
  ProductType,
  ProductTypeDocument,
} from './schemas/product-type.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { Model, FilterQuery } from 'mongoose';
import { MESSAGE } from 'src/share/messages/messages';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectModel(ProductType.name)
    private readonly productTypeModel: Model<ProductTypeDocument>,
    private readonly productsService: ProductsService,
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

  findMany(currentUserId: string, productTypeDto: ProductTypeDto) {
    const { name, code } = productTypeDto;

    const findOptions: FilterQuery<ProductTypeDocument> = {
      createdBy: currentUserId,
      isActive: true,
    };

    if (name) {
      findOptions.name = { $regex: name, $options: 'i' };
    }

    if (code) {
      findOptions.code = code;
    }

    return this.productTypeModel.find(findOptions).select('-__v').exec();
  }

  async deleteOne(id: string, currentUserId: string) {
    await this.productsService.deleteMany(id, currentUserId);

    const { deletedCount } = await this.productTypeModel.deleteOne({
      _id: id,
      createdBy: currentUserId,
    });

    if (!deletedCount) throw new BadRequestException();

    return { message: MESSAGE.SUCCESS.DELETE_ITEM };
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
