import { PropsPositionEnum } from './../config/file.config';
import { Brand, BrandDocument } from './../brand/schemas/brand.schema';
import {
  ProductType,
  ProductTypeDocument,
} from './../product-types/schemas/product-type.schema';
import { compareTwoString, setRequiredCol } from './../share/utils';
import { FindManyProductDto, FindAllProductDto } from './dto/product.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import * as ExcelJS from 'exceljs';
import { MESSAGE } from 'src/share/messages/messages';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { Response } from 'express';
import { TEMPLATE_FILE } from 'src/config/file.config';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(ProductType.name)
    private readonly productTypeModel: Model<ProductTypeDocument>,
    @InjectModel(Brand.name)
    private readonly brandModel: Model<BrandDocument>,
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

  findAll(query: FindAllProductDto, currentUserId: string) {
    const { name, brands, productTypes } = query;
    const condition: FilterQuery<ProductDocument> = {
      createdBy: currentUserId,
    };

    if (name) condition.name = { $regex: name, $options: 'i' };

    if (brands) condition.brand = { $in: brands };

    if (productTypes) condition.productType = { $in: productTypes };

    return this.productModel
      .find(condition)
      .populate('productType', '-__v')
      .populate('brand', '-__v')
      .select('-__v');
  }

  findMany(query: FindManyProductDto, currentUserId: string) {
    const currentPage = +query.currentPage;
    const pageSize = +query.pageSize;
    const skip = (currentPage - 1) * pageSize;
    return this.findAll(query, currentUserId).skip(skip).limit(pageSize).exec();
  }

  findById(id: string) {
    return this.productModel
      .findById(id)
      .populate('productType', '-__v')
      .populate('brand', '-__v')
      .select('-__v')
      .exec();
  }

  count(query: FindAllProductDto, currentUserId: string) {
    return this.findAll(query, currentUserId).countDocuments().exec();
  }

  async exportToXlsx(
    query: FindAllProductDto,
    currentUserId: string,
    res: Response,
  ) {
    const data = await this.findAll(query, currentUserId).exec();
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile('public/templates/export_template.xlsx');
    workbook.creator = 'warehouse';
    workbook.lastModifiedBy = 'warehouse';
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.getWorksheet('Export');

    let stt = 1;
    for (const product of data) {
      worksheet.addRow([
        stt,
        product.name,
        product.productType.name,
        product.brand.name,
        product.code || '',
        product.barcode || '',
        product.weight || '',
        product.unit,
        '',
        product.tax ? 'Có' : 'Không',
        '',
        '',
        '',
        product.quantity,
        '',
        product.wholesalePrice || 0,
        product.importPrice,
        product.retailPrice,
      ]);
      stt++;
    }

    for (let rowIndex = 2; rowIndex <= worksheet.rowCount; rowIndex++) {
      worksheet.getRow(rowIndex).alignment = {
        wrapText: true,
        vertical: 'top',
        horizontal: 'left',
      };
    }

    const buffer = await workbook.xlsx.writeBuffer();

    res.write(buffer);

    res.end();
  }

  async downloadTemplate(res: Response) {
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile('public/templates/import_template.xlsx');
    workbook.creator = 'warehouse';
    workbook.lastModifiedBy = 'warehouse';
    workbook.created = new Date();
    workbook.modified = new Date();

    const buffer = await workbook.xlsx.writeBuffer();

    res.write(buffer);

    res.end();
  }

  async uploadFile(file: Express.Multer.File, currentUserId: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);

    const worksheet = workbook.getWorksheet('template');

    if (!Boolean(worksheet)) {
      throw new BadRequestException(MESSAGE.ERROR.INCORRECT_FILE);
    }

    this.checkHeader(worksheet.getRow(1));

    const result = {
      total: worksheet.rowCount - 1,
      error: 0,
      errorRows: [],
    };

    for (let rowIndex = 2; rowIndex <= worksheet.rowCount; rowIndex++) {
      try {
        const currentRow = worksheet.getRow(rowIndex);
        const currentProduct: CreateProductDto = {
          name: currentRow
            .getCell(PropsPositionEnum.NAME)
            .value.toLocaleString(),
          code:
            currentRow.getCell(PropsPositionEnum.CODE).value &&
            currentRow.getCell(PropsPositionEnum.CODE).value.toLocaleString(),
          barcode:
            currentRow.getCell(PropsPositionEnum.BARCODE).value &&
            currentRow
              .getCell(PropsPositionEnum.BARCODE)
              .value.toLocaleString(),
          weight:
            currentRow.getCell(PropsPositionEnum.WEIGHT).value &&
            +currentRow
              .getCell(PropsPositionEnum.WEIGHT)
              .value.toLocaleString(),
          unit: currentRow
            .getCell(PropsPositionEnum.UNIT)
            .value.toLocaleString(),
          retailPrice: +currentRow
            .getCell(PropsPositionEnum.RETAIL_PRICE)
            .value.toLocaleString(),
          importPrice: +currentRow
            .getCell(PropsPositionEnum.RETAIL_PRICE)
            .value.toLocaleString(),
          wholesalePrice:
            currentRow.getCell(PropsPositionEnum.WHOLE_SALE_PRICE).value &&
            +currentRow
              .getCell(PropsPositionEnum.WHOLE_SALE_PRICE)
              .value.toLocaleString(),
          productType: currentRow
            .getCell(PropsPositionEnum.PRODUCT_TYPE)
            .value.toLocaleString(),
          brand: currentRow
            .getCell(PropsPositionEnum.BRAND)
            .value.toLocaleString(),
          tax:
            currentRow.getCell(PropsPositionEnum.TAX).value &&
            currentRow.getCell(PropsPositionEnum.TAX).value.toLocaleString() ===
              'Có'
              ? true
              : false,
          quantity: +currentRow
            .getCell(PropsPositionEnum.QUANTITY)
            .value.toLocaleString(),
        };

        if (currentRow.getCell(PropsPositionEnum.NAME).value)
          if (currentProduct.productType) {
            const existType = await this.productTypeModel.findOne({
              name: currentProduct.productType,
              createdBy: currentUserId,
            });
            if (existType) {
              currentProduct.productType = existType._id;
            } else throw new BadRequestException();
          }

        if (currentProduct.brand) {
          const existBrand = await this.brandModel.findOne({
            name: currentProduct.brand,
            createdBy: currentUserId,
          });
          if (existBrand) {
            currentProduct.brand = existBrand._id;
          } else throw new BadRequestException();
        }

        await this.create(currentProduct, currentUserId);
      } catch (error) {
        result.error++;
        result.errorRows.push(rowIndex - 1);
      }
    }

    return result;
  }

  async deleteMany(typeId: string, currentUserId) {
    const { deletedCount } = await this.productModel.deleteMany({
      productType: typeId,
      createdBy: currentUserId,
    });

    return deletedCount;
  }

  async deleteOne(productId: string, currentUserId: string) {
    const { deletedCount } = await this.productModel.deleteOne({
      _id: productId,
      createdBy: currentUserId,
    });

    if (!deletedCount) throw new BadRequestException();

    return { message: MESSAGE.SUCCESS.DELETE_ITEM };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  checkHeader(headerRow: ExcelJS.Row) {
    headerRow.eachCell((cell, colNumber) => {
      if (
        !compareTwoString(
          cell.value.toString(),
          TEMPLATE_FILE.headers[colNumber - 1],
        ) &&
        colNumber <= TEMPLATE_FILE.headers.length
      ) {
        throw new BadRequestException(
          setRequiredCol(TEMPLATE_FILE.headers[colNumber - 1]),
        );
      }
    });
  }
}
