import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/share/schemas/base.schema';

@Schema({ timestamps: true })
export class Brand extends BaseSchema {
  @Prop({ required: true, type: String, trim: true, unique: true })
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

export type BrandDocument = Brand & Document;

export const BrandSchema = SchemaFactory.createForClass(Brand);
