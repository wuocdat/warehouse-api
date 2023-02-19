import { BaseSchema } from 'src/share/schemas/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ImportOrderStatusE } from '../i-order.enum';
import mongoose from 'mongoose';

export type IOrderDocument = IOrder & Document;

@Schema({ timestamps: true })
export class IOrder extends BaseSchema {
  @Prop({ required: true, type: String, trim: true, unique: true })
  code: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
  })
  supplier: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  product: string;

  @Prop({
    required: true,
    type: String,
    enum: ImportOrderStatusE,
    default: ImportOrderStatusE.CREATE,
  })
  status: ImportOrderStatusE;

  @Prop({ required: true, type: String })
  deliveryDate: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: false, type: Number })
  cost?: number;

  @Prop({ required: false, type: String, trim: true })
  note?: string;
}

export const IOrderSchema = SchemaFactory.createForClass(IOrder);
