import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductTypesModule } from './product-types/product-types.module';
import authConfig from './config/auth.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { BrandModule } from './brand/brand.module';
import { ProductsModule } from './products/products.module';
import { SupplierModule } from './supplier/supplier.module';
import { IOrderModule } from './i-order/i-order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    }),
    UsersModule,
    AuthModule,
    ProductTypesModule,
    BrandModule,
    ProductsModule,
    SupplierModule,
    IOrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
