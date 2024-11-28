import { Module } from '@nestjs/common';
import { UsersModule } from './modulos/Users/users.module';
import { AuthModule } from './modulos/Auth/auth.module';
import { ProductModule } from './modulos/Products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';
import { CategoriesModule } from './modulos/categories/categories.module';
import { OrderDetailModule } from './modulos/orderDetails/orderDetail.module';
import { OrdersModule } from './modulos/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    load: [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ConfigService.get('typeorm'),
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    CategoriesModule,
    OrderDetailModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
