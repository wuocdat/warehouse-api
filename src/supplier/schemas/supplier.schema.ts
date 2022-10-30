import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/share/schemas/base.schema';
import { PaymentsEnum } from '../supplier.enum';

export type SupplierDocument = Supplier & Document;

@Schema({ timestamps: true })
export class Supplier extends BaseSchema {
  @Prop({ required: true, type: String, trim: true, default: '', unique: true })
  name: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  code?: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  phoneNumber?: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  email?: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  tag?: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  area?: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  address?: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  wards?: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  website?: string;

  @Prop({
    required: true,
    type: [Number],
    enum: PaymentsEnum,
    trim: true,
  })
  payments: number[];

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  note?: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
