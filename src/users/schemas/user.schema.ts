import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: false, type: String, trim: true, default: '' })
  name: string;

  @Prop({ type: String, required: true })
  role: string;

  @Prop({ type: String, default: '' })
  phoneNumber?: string;

  @Prop({ type: Number, default: null })
  birthYear?: number;

  @Prop({ required: true, type: String, unique: true, trim: true })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
