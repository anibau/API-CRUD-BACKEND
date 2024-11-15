import { Module } from '@nestjs/common';
import { UsersModule } from './modulos/Users/users.module';
import { AuthModule } from './modulos/Auth/auth.module';
import { ProductModule } from './modulos/Products/product.module';

@Module({
  imports: [UsersModule, AuthModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
