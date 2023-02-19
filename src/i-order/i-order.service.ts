import { FindAllIOrderDto, FindManyIOrderDto } from './dto/i-order.dto';
import { IOrder, IOrderDocument } from './schemas/i-order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateIOrderDto } from './dto/create-i-order.dto';
import { UpdateIOrderDto } from './dto/update-i-order.dto';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class IOrderService {
  constructor(
    @InjectModel(IOrder.name)
    private readonly iOrderModel: Model<IOrderDocument>,
  ) {}

  create(createIOrderDto: CreateIOrderDto, userId: string) {
    const createOptions = {
      ...createIOrderDto,
      createdBy: userId,
      updatedBy: userId,
    };

    return this.iOrderModel.create(createOptions);
  }

  findAll(findAllIOrder: FindAllIOrderDto) {
    const { code } = findAllIOrder;
    const findOptions: FilterQuery<IOrderDocument> = {};
    if (code) {
      findOptions.code = { $regex: code, $options: 'i' };
    }
    return this.iOrderModel
      .find(findOptions)
      .populate('product', '-__v')
      .populate('supplier', '-__v')
      .select('-__v');
  }

  findMany(findMany: FindManyIOrderDto) {
    const currentPage = +findMany.currentPage;
    const pageSize = +findMany.pageSize;
    const skip = (currentPage - 1) * pageSize;
    return this.findAll(findMany).skip(skip).limit(pageSize).exec();
  }

  async countIOrders(query: FindAllIOrderDto) {
    return await this.findAll(query).countDocuments().exec();
  }

  findOne(id: string) {
    return this.iOrderModel
      .findById(id)
      .populate('product', '-__v')
      .populate('supplier', '-__v')
      .select('-__v')
      .exec();
  }

  update(id: number, updateIOrderDto: UpdateIOrderDto) {
    return `This action updates a #${id} iOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} iOrder`;
  }
}
