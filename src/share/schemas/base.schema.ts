import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { CommonSchema } from './common.schema';

@Schema({ timestamps: true })
export class BaseSchema extends CommonSchema {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.PopulatedDoc<UserDocument>;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy: mongoose.PopulatedDoc<UserDocument>;

  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;
}

export type BaseDocument = BaseSchema & Document;
