import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/share/schemas/base.schema';

export type ProductTypeDocument = ProductType & Document;

@Schema({ timestamps: true })
export class ProductType extends BaseSchema {
  @Prop({ required: true, type: String, trim: true, default: '', unique: true })
  name: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  code?: string;

  @Prop({ required: false, type: String, default: '' })
  note?: string;
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);
