import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MESSAGE } from 'src/share/messages/error-messages';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto, currentUserId: string) {
    const { code, barcode } = createProductDto;

    if (code) {
      const exitCode = await this.productModel.findOne({
        code,
        createdBy: currentUserId,
      });
      if (exitCode) throw new ConflictException(MESSAGE.ERROR.CODE_CONFLICT);
    }

    if (barcode) {
      const exitCode = await this.productModel.findOne({
        barcode,
        createdBy: currentUserId,
      });
      if (exitCode) throw new ConflictException(MESSAGE.ERROR.BARCODE_CONFLICT);
    }

    const result = {
      ...createProductDto,
      createdBy: currentUserId,
      updatedBy: currentUserId,
    };
    return await this.productModel.create(result);
  }

  findAll(currentUserId: string) {
    return this.productModel
      .find({ createdBy: currentUserId, isActive: true })
      .populate('productType', '-__v')
      .populate('brand', '-__v')
      .select('-__v')
      .exec();
  }

  // findMany(params: ) {

  // }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
