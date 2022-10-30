import { FindSupplierDto } from './dto/supplier.dto';
import { SupplierModule } from './supplier.module';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier, SupplierDocument } from './schemas/supplier.schema';
import { FilterQuery, Model } from 'mongoose';
import { MESSAGE } from 'src/share/messages/messages';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name)
    private readonly supplierModule: Model<SupplierDocument>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto, currentUserId: string) {
    const { code } = createSupplierDto;

    if (code) {
      const exitCode = await this.supplierModule.findOne({
        code,
        createdBy: currentUserId,
      });
      if (exitCode) throw new ConflictException(MESSAGE.ERROR.CODE_CONFLICT);
    }

    return this.supplierModule.create({
      ...createSupplierDto,
      createdBy: currentUserId,
      updatedBy: currentUserId,
    });
  }

  findAll(findSupplierDto: FindSupplierDto) {
    const { name, code } = findSupplierDto;

    const findOption: FilterQuery<SupplierDocument> = {};

    if (name) {
      findOption.name = { $regex: name, $options: 'i' };
    }

    if (code) {
      findOption.code = code;
    }

    return this.supplierModule.find(findOption).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
