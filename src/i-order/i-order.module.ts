import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { IOrderService } from './i-order.service';
import { IOrderController } from './i-order.controller';
import { IOrder, IOrderSchema } from './schemas/i-order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: IOrder.name, schema: IOrderSchema }]),
  ],
  controllers: [IOrderController],
  providers: [IOrderService],
})
export class IOrderModule {}
