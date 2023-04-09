import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ProductModule, UserModule],
})
export class AppModule {}
