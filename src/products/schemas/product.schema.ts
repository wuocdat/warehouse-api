import { BrandDocument } from './../../brand/schemas/brand.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BaseSchema } from 'src/share/schemas/base.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product extends BaseSchema {
  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  name: string;

  @Prop({ required: false, type: String, trim: true })
  code?: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  barcode?: string;

  @Prop({
    required: false,
    type: Number,
  })
  weight?: number;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  unit: string;

  @Prop({
    required: true,
    type: Number,
  })
  retailPrice: number;

  @Prop({
    required: true,
    type: Number,
  })
  importPrice: number;

  @Prop({
    required: false,
    type: Number,
  })
  wholesalePrice?: number;

  @Prop({
    required: false,
    type: [String],
  })
  images?: string[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductType',
  })
  productType: mongoose.PopulatedDoc<ProductDocument>;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  })
  brand: mongoose.PopulatedDoc<BrandDocument>;

  @Prop({
    required: false,
    type: Boolean,
    default: false,
  })
  tax?: boolean;

  @Prop({ required: true, type: Number, default: 0 })
  sellableQuantity: number;

  @Prop({ required: true, type: Number, default: 0 })
  quantity: number;

  @Prop({
    required: false,
    type: Boolean,
    default: true,
  })
  active?: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
