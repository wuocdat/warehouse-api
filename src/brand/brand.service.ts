import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<BrandDocument>,
  ) {}

  create(createBrandDto: CreateBrandDto, currentUserId: string) {
    const result = {
      ...createBrandDto,
      createdBy: currentUserId,
      updatedBy: currentUserId,
    };
    return this.brandModel.create(result);
  }

  findAllById(userId: string) {
    return this.brandModel
      .find({ createdBy: userId, isActive: true })
      .select('-__v')
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
